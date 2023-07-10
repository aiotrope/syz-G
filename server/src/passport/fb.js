import config from '../config'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import { Strategy as FacebookStrategy } from 'passport-facebook'

import cache from '../utils/redis'
import User from '../models/user'

const options = {
  clientID: config.fb_client_id,
  clientSecret: config.fb_client_secret,
  callbackURL: config.fb_callback_url,
  passReqToCallback: true,
  profileFields: ['id', 'displayName', 'photos', 'email']
}

export const fbLogin = (passport) => {
  passport.use(
    new FacebookStrategy(
      options,
      async (req, accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ facebookId: profile.id })
        const sess = req.session

        if (!user) {
          const newUser = await User.create({
            email: profile?.emails[0].value,
            username: profile.displayName,
            facebookId: profile.id,
            // photo: profile?.photos[0].value
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

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

