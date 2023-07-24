'use strict'
import config from '../dist/config'
import request from 'supertest'
import app from '../dist/app'
import User from '../dist/models/user'
import helper from './helper'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { verify, sign } from 'jsonwebtoken'

describe('POST signup - unit test for users with 2 users on db', () => {
  beforeEach(async () => {
    const hash = await bcrypt.hash('testPass45#', 10)

    const user1 = new User({
      username: 'username1',
      email: 'testuser1@test.com',
      hashedPassword: hash,
    })
    const user2 = new User({
      username: 'username2',
      email: 'testuser2@test.com',
      hashedPassword: hash,
    })

    const u1 = await User.create(user1)
    const u2 = await User.create(user2)

    await Promise.all([u1, u2])
  })

  afterEach(async () => {
    await User.deleteMany({})
  })

  test('it can create new user', async () => {
    const usersAtStart = await helper.savedUsers()
    const newUser = {
      username: 'username3',
      email: 'testuser3@test.com',
      password: 'testPass22+',
      confirm: 'testPass22+',
    }

    const registerUser = await request(app)
      .post('/api/user/signup')
      .send(newUser)
    expect(registerUser.type).toEqual('application/json')
    expect(registerUser.body.user).toHaveProperty('posts')
    expect(registerUser.body.user).toHaveProperty('comments')
    expect(registerUser.body.user.username).toEqual('username3')
    expect(registerUser.body.user.email).toEqual('testuser3@test.com')
    expect(registerUser.status).toEqual(201)
    expect(registerUser.body.message).toBe('testuser3@test.com created')

    const usersAtEnd = await helper.savedUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)

    expect(usernames).toContain(newUser.username)
  })

  test('PATCH - authenticated user can update their own profile. Eg. update username, email and bio', async () => {
    const sampleUser = await User.findOne({
      email: 'testuser2@test.com',
      username: 'username2',
    })

    const sampleToken = sign(
      {
        username: sampleUser.username,
        id: sampleUser.id,
        email: sampleUser.email,
      },
      config.jwt_secret,
      { expiresIn: '2h' }
    )

    const updateData = {
      username: 'username22',
      email: 'username22@test.org',
      bio: 'You cannot circle back the domain without bike-shedding the minimum viable GZIP webpack!',
    }

    await request(app)
      .patch(`/api/user/update/${sampleUser.id}`)
      .set('Authorization', `Bearer ${sampleToken}`)
      .send(updateData)
      .then((response) => {
        //console.log(response.body)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200)
        expect(response.body.message).toEqual(
          `${updateData.username} profile updated`
        )
        expect(response.body.user.username).toEqual(updateData.username)
        expect(response.body.user.email).toEqual(updateData.email)
        expect(response.body.user.bio).toEqual(updateData.bio)
      })
  })

  test('it should fail on duplicate username', async () => {
    const newUserFail = {
      username: 'username1',
      email: 'testuser4@test.com',
      password: 'testPass22+',
      confirm: 'testPass22+',
    }

    const registerUser = await request(app)
      .post('/api/user/signup')
      .send(newUserFail)

    expect(registerUser.status).toEqual(403)
    expect(registerUser.body.error).toBe('Cannot use the username provided')
  })
  test('it should fail on duplicate username', async () => {
    const newUserFail = {
      username: 'username4',
      email: 'testuser2@test.com',
      password: 'testPass22+',
      confirm: 'testPass22+',
    }

    const registerUser = await request(app)
      .post('/api/user/signup')
      .send(newUserFail)
    expect(registerUser.status).toEqual(403)
    expect(registerUser.body.error).toBe('Cannot use the email provided')
  })

  test('it should get user by id of saved user with email testuser2@test.com', async () => {
    const savedUser2 = await User.findOne({ email: 'testuser2@test.com' })
    await request(app)
      .get(`/api/user/${savedUser2.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200)
        expect(response.body.username).toBe('username2')
        expect(response.body.email).toBe('testuser2@test.com')
      })
  })
})

describe('POST login - unit test for users signin @ /api/user/signin', () => {
  beforeEach(async () => {
    const hash = await bcrypt.hash('testPass45#', 10)

    const user1 = new User({
      username: 'username1',
      email: 'testuser1@test.com',
      hashedPassword: hash,
    })
    const user2 = new User({
      username: 'username2',
      email: 'testuser2@test.com',
      hashedPassword: hash,
    })

    const u1 = await User.create(user1)
    const u2 = await User.create(user2)

    await Promise.all([u1, u2])
  })

  afterEach(async () => {
    await User.deleteMany({})
  })

  test('it can sign in registered user and generates access token', async () => {
    const userInput = {
      email: 'testuser1@test.com',
      password: 'testPass45#',
    }

    const signin = await request(app).post('/api/user/signin').send(userInput)
    expect(signin.type).toEqual('application/json')
    expect(signin.status).toEqual(200)
    expect(signin.body).toHaveProperty('access')
    expect(typeof signin.body.access === 'string').toBeTruthy()
    expect(signin.body.message).toBe(`${userInput.email} signed-in`)

    const verifyUser = verify(signin.body.access, config.jwt_secret)
    expect(verifyUser.email).toEqual(userInput.email)

    const findUser = await User.findOne({ email: userInput.email })

    expect(findUser.id).toEqual(verifyUser.id)
  })

  test('it should fail on incorrect email', async () => {
    const user = {
      email: 'testuser3@test.com',
      password: 'testPass45#',
    }

    const signin = await request(app).post('/api/user/signin').send(user)
    expect(signin.type).toEqual('application/json')
    expect(signin.status).toBe(401)
    expect(signin.body.error).toBe('Incorrect login credentials')
  })

  test('it should fail on incorrect password', async () => {
    const user = {
      email: 'testuser1@test.com',
      password: 'testPass',
    }

    const signin = await request(app).post('/api/user/signin').send(user)
    expect(signin.type).toEqual('application/json')
    expect(signin.status).toBe(401)
    expect(signin.body.error).toBe('Incorrect login credentials')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
