const config = require('../config')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const cache = require('../utils/redis')
const User = require('../models/user')

const options = {
  clientID: config.fb_client_id,
  clientSecret: config.fb_client_secret,
  callbackURL: config.fb_callback_url,
  passReqToCallback: true,
}

const fbLogin = (passport) => {
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
            await cache.setAsync('currentUser', JSON.stringify(newUser))
            sess.user = JSON.stringify(newUser)

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

module.exports = fbLogin
