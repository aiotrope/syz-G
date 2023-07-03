import config from '../../utils/config'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import User from '../../models/user'
//import logger from '../../utils/logger'

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
            email: profile.emails?.[0].value,
            username: profile.displayName,
            googleId: profile.id,
            // photo: profile.photos[0].value
            // req.isAuthenticated()
          })

          if (newUser) {
            req.user = newUser
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

/* passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})
 */
