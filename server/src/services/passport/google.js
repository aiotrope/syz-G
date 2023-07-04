import config from '../../utils/config'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

import User from '../../models/user'

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
            // photo: profile.picture
            // req.isAuthenticated()
          })

          if (newUser) {
            return done(null, newUser)
          }
        }
        if (user) {
          req.user = user
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
