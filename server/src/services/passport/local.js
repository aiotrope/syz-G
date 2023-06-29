import { Strategy } from 'passport-local'
import bcrypt from 'bcrypt'

import User from '../../models/user'

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
}

const verifyAuthCredentialsCallback = (email, password, cb) => {
  User.findOne({ email }).then((user) => {
    if (!user) {
      return cb(null, false)
    } else {
      const isCorrectPassword = bcrypt.compareSync(
        password,
        user.hashedPassword
      )
      if (!isCorrectPassword) {
        return cb(null, false)
      } else {
        return cb(null, user)
      }
    }
  })
}

export const localStrategy = (passport) => {
  passport.use(new Strategy(customFields, verifyAuthCredentialsCallback))

  passport.serializeUser((user, cb) => cb(null, user.id))

  passport.deserializeUser((id, cb) =>
    User.findById(id)
      .then((user) => cb(null, user))
      .catch((err) => cb(err))
  )
}
