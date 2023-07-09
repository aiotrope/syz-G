import config from '../config'
import jwt from 'jsonwebtoken'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import cache from '../utils/redis'
import User from '../models/user'

const options = {
  clientID: config.fb_client_id,
  clientSecret: config.fb_client_secret,
  callbackURL: config.fb_callback_url,
  passReqToCallback: true,
}

export const fbLogin = (passport) => {
  passport.use(
    new FacebookStrategy(
      options,
      async (req, accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ googleId: profile.id })
        const sess = req.session

        if (!user) {
          const newUser = await User.create({
            email: profile.email,
            username: profile.displayName,
            googleId: profile.id,
            // photo: profile.picture
            // req.isAuthenticated()
          })

          if (newUser) {
            let payload = {
              id: user.id,
              email: user.email,
              username: user.username,
            }

            let token = jwt.sign(payload, config.jwt_secret, {
              expiresIn: '2h',
            })

            await cache.setAsync('access', JSON.stringify(token))

            return done(null, newUser)
          }
        }
        if (user) {
          await cache.setAsync('currentUser', JSON.stringify(user))
          sess.user = JSON.stringify(user)

          return done(null, user)
        }
      }
    )
  )
}
