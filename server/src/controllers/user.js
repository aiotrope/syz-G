import config from '../utils/config'
require('express-async-errors')
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/user'
import { signupSchema, signinSchema } from '../utils/validators'

//import logger from '../utils/logger'

// return an array of users objects with id, email, username, isStaff and timestamps

const getAll = async (req, res) => {
  try {
    const users = await User.find({}).select({
      hashedPassword: 0,
      googleId: 0,
    })

    if (!users) throw Error('Problem fetching users')

    return res.status(200).json(users)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

//create new user with request body of email, password and confirm

const signup = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email })

  if (foundUser) throw Error('Cannot use the email provided')

  try {
    const validData = signupSchema.validate(req.body)

    if (validData.error) {
      return res.status(400).json({ error: validData.error.details[0].message })
    } else {
      const saltRounds = 10

      const hashed = await bcrypt.hash(req.body.password, saltRounds)

      const user = new User({
        email: validData.value.email,
        username: validData.value.username,
        hashedPassword: hashed,
      })

      await user.save()

      return res
        .status(201)
        .json({ message: `${user.email} registered`, ...user })
    }
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

// login user with email and password

const signin = async (req, res) => {
  let { email, password } = req.body

  const validData = signinSchema.validate(req.body)

  if (validData.error) {
    return res.status(400).json({ error: validData.error.details.message })
  }

  try {
    const user = await User.findOne({ email })

    const correctPassword =
      user === null
        ? false
        : await bcrypt.compare(password, user.hashedPassword)

    if (!(user && correctPassword)) throw Error('Incorrect login credentials')

    const payload = {
      id: user.id,
      email: user.email,
    }

    const token = jwt.sign(payload, config.jwt_secret, { expiresIn: '1h' })

    const decoded = jwt.verify(token, config.jwt_secret)

    req.user = user

    req.access = token

    res.status(200).json({
      message: `${decoded.email} signed-in`,
      access: token,
    })
  } catch (err) {
    res.status(401).json({ error: err.message })
  }
}

// get user using params id

const getById = async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findById(id).select({
      hashedPassword: 0,
    })

    if (!user) {
      return res.status(404).json({ error: `Problem fetching user: ${user}` })
    }

    return res.status(200).json(user)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

export default {
  getAll,
  signup,
  signin,
  getById,
}
