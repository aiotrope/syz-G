import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import Joi from 'joi'

import User from '../../models/user'
import { signinSchema } from '../../utils/validators'

const options = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}

export const localLogin = (passport) => {
  passport.use(
    new LocalStrategy(options, async (req, email, password, done) => {
      const { error } = Joi.validate(req.body, signinSchema)
      if (error) {
        return done(null, false, { message: error.details[0].message })
      }

      try {
        const user = await User.findOne({ email: email })

        if (!user) {
          return done(null, false, { message: 'User does not exists.' })
        }

        const isCorrectPassword = bcrypt.compareSync(
          password,
          user.hashedPassword
        )
        if (!isCorrectPassword) {
          return done(null, false)
        } else {
          return done(null, user)
        }
      } catch (err) {
        return done(err)
      }
    })
  )
}
