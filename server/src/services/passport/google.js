import config from '../../utils/config'
import passport from 'passport'
import { Strategy } from 'passport-google-oauth2'

import User from '../../models/user'
//import logger from '../../utils/logger'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new Strategy(
    {
      clientID: config.google_client_id,
      clientSecret: config.google_client_secret,
      callbackURL: config.google_callback_url,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id })
      if (!user) {
        const newUser = await User.create({
          email: profile.emails?.[0].value,
          username: profile.displayName,
          googleId: profile.id,
          // photo: profile.photos[0].value
          // req.isAuthenticated()
        })

        if (newUser) {
          return done(null, newUser)
        }
      }
      if (user) {
        return done(null, user && user[0])
      }
    }
  )
)
