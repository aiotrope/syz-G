'use strict'
import config from '../dist/config'
import request from 'supertest'
import app from '../dist/app'
import mongoose from 'mongoose'
import User from '../dist/models/user'
import Post from '../dist/models/post'
import helper from './helper'
import bcrypt from 'bcrypt'
import { sign } from 'jsonwebtoken'

beforeAll(async () => {
  const keys = Object.keys(mongoose.connection.collections)
  keys.forEach(async (key) => {
    await mongoose.connection.collections[key].deleteMany({})
  })

  const hash = await bcrypt.hash('testPass22*', 10)

  const user1 = new User({
    username: 'username11',
    email: 'testuser11@test.com',
    hashedPassword: hash,
  })

  const user2 = new User({
    username: 'username12',
    email: 'testuser12@test.com',
    hashedPassword: hash,
  })

  const user = await User.create(user1)

  const reservedUser = await User.create(user2)

  const post0 = new Post({
    title: helper.testPosts[0].title,
    tags: helper.testPosts[0].tags,
    description: helper.testPosts[0].description,
    entry: helper.testPosts[0].entry,
    user: mongoose.Types.ObjectId(user.id),
  })
  const post1 = new Post({
    title: helper.testPosts[1].title,
    tags: helper.testPosts[1].tags,
    description: helper.testPosts[1].description,
    entry: helper.testPosts[1].entry,
    user: mongoose.Types.ObjectId(user.id),
  })
  const post2 = new Post({
    title: helper.testPosts[2].title,
    tags: helper.testPosts[2].tags,
    description: helper.testPosts[2].description,
    entry: helper.testPosts[2].entry,
    user: mongoose.Types.ObjectId(user.id),
  })

  const snippet0 = await Post.create(post0)
  const snippet1 = await Post.create(post1)
  const snippet2 = await Post.create(post2)

  await Promise.all([user, reservedUser, snippet0, snippet1, snippet2])
})

describe('GET all posts - unit test for get request @ /api/post with three default posts created by username11', () => {
  test('it should return an array with 3 post snippet objects', async () => {
    await request(app)
      .get('/api/post')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(200)
        expect(Array.isArray(response.body)).toBeTruthy()
        expect(response.body.length).toEqual(3)
        expect(response.body[0].user.email).toBe('testuser11@test.com')
        expect(response.body[1].user.email).toBe('testuser11@test.com')
        expect(response.body[2].user.email).toBe('testuser11@test.com')
        expect(response.body[0].title).toBe(helper.testPosts[0].title)
        expect(response.body[1].title).toBe(helper.testPosts[1].title)
        expect(response.body[2].title).toBe(helper.testPosts[2].title)
      })
  })

  test('post request @ /api/post. Can create snippet with reference to the current authenticated user', async () => {
    const sampleUser = await User.findOne({
      username: 'username12',
      email: 'testuser12@test.com',
    })

    const token = sign(
      {
        username: sampleUser.username,
        id: sampleUser.id,
        email: sampleUser.email,
      },
      config.jwt_secret,
      { expiresIn: '2h' }
    )

    const postData = {
      title: helper.testPosts[3].title,
      tag: ['python', 'java', 'js'],
      description: helper.testPosts[3].description,
      entry: helper.testPosts[3].entry,
    }

    await request(app)
      .post('/api/post')
      .set('Authorization', `Bearer ${token}`)
      .send(postData)
      .then((response) => {
        //console.log(response.body)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(201)
        expect(response.body.message).toBe(
          `${sampleUser.username} created new snippet: ${postData.title}`
        )
        expect(response.body.post.title).toEqual(postData.title)
        expect(response.body.post.entry).toEqual(postData.entry)
        expect(response.body.post.tags).toEqual(postData.tag)
        expect(response.body.post.user.id).toEqual(sampleUser.id)
        expect(response.body.post.user.email).toEqual(sampleUser.email)
      })
  })

  test('post request @ /api/post. Only auth user can create snippet', async () => {
    const postData = {
      title: helper.testPosts[3].title,
      tag: ['python', 'java', 'js'],
      description: helper.testPosts[3].description,
      entry: helper.testPosts[3].entry,
    }

    await request(app)
      .post('/api/post')

      .send(postData)
      .then((response) => {
        //console.log(response.body)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(401)
      })
  })

  test('post request @ /api/commet. Can create comment with reference to the current authenticated user and post Id params', async () => {
    const sampleUser = await User.findOne({
      username: 'username12',
      email: 'testuser12@test.com',
    })

    const savedPost = await Post.findOne({ title: helper.testPosts[2].title })

    const token = sign(
      {
        username: sampleUser.username,
        id: sampleUser.id,
        email: sampleUser.email,
      },
      config.jwt_secret,
      { expiresIn: '2h' }
    )

    const commentData = {
      commentary: helper.sampleComment,
    }

    await request(app)
      .post(`/api/comment/${savedPost.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(commentData)
      .then((response) => {
        //console.log(response.body)
        expect(response.type).toEqual('application/json')
        expect(response.statusCode).toEqual(201)
        expect(response.body.message).toBe(
          `${sampleUser.username} commented on post: ${savedPost.title}`
        )
        expect(response.body.comment.commentary).toEqual(helper.sampleComment)
        expect(response.body.comment.commenter.id).toEqual(sampleUser.id)
        expect(response.body.comment.commentOn.id).toEqual(savedPost.id)
      })
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})
