import config from '../config'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import jwt from 'jsonwebtoken'

import cache from '../utils/redis'
import User from '../models/user'
const options = {
  clientID: config.google_client_id,
  clientSecret: config.google_client_secret,
  callbackURL: config.google_callback_url,
  passReqToCallback: true,
}

export const googleLogin = (passport) => {
  passport.use(
    new GoogleStrategy(
      options,
      async (req, accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ googleId: profile.id })

        if (!user) {
          const newUser = await User.create({
            email: profile.email,
            username: profile.displayName,
            googleId: profile.id,
          })

          if (newUser) {
            let payload = {
              id: newUser.id,
              email: newUser.email,
              username: newUser.username,
            }

            let token = jwt.sign(payload, config.jwt_secret, {
              expiresIn: '2h',
            })

            await cache.setAsync('access', JSON.stringify(token))

            return done(null, newUser)
          }
        }
        if (user) {
          let payload = {
            id: user.id,
            email: user.email,
            username: user.username,
          }

          let token = jwt.sign(payload, config.jwt_secret, {
            expiresIn: '2h',
          })

          await cache.setAsync('access', JSON.stringify(token))

          return done(null, user)
        }
      }
    )
  )
}
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})
