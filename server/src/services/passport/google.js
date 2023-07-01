import config from '../../utils/config'
import passport from 'passport'
import { Strategy } from 'passport-google-oauth20'

import User from '../../models/user'
import logger from '../../utils/logger'

export const googleStrategy = (passport) => {
  passport.use(
    new Strategy(
      {
        clientID: config.google_client_id,
        clientSecret: config.google_client_secret,
        callbackURL: config.google_callback_url,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, cb) => {
        const user = await User.findOne({ googleId: profile.id })
        if (!user) {
          const newUser = await User.create({
            email: profile.emails?.[0].value,
            username: profile.displayName,
            googleId: profile.id,
          })

          if (newUser) {
            req.user = newUser
            req.access = accessToken
            logger.warn({ accessToken, refreshToken, newUser })
            return cb(null, newUser)
          }
        }
        if (user) {
          req.user = user
          req.access = accessToken
          return cb(null, user && user[0])
        }
      }
    )
  )
}

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id)
  cb(null, user)
})
