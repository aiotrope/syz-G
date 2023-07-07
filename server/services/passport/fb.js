const config = require('../../config')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook')

const cache = require('../../utils/redis')
const User = require('../../models/user')

const options = {
  clientID: config.fb_client_id,
  clientSecret: config.fb_client_secret,
  callbackURL: config.fb_callback_url,
  passReqToCallback: true,
}

passport.use(
  new FacebookStrategy(
    options,
    async (req, accessToken, refreshToken, profile, cb) => {
      const user = await User.findOne({ facebookId: profile.id })
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

          return cb(null, newUser)
        }
      }
      if (user) {
        await cache.setAsync('currentUser', JSON.stringify(user))
        sess.user = JSON.stringify(user)

        return cb(null, user)
      }
    }
  )
)

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser(async (id, cb) => {
  const user = await User.findById(id)
  cb(null, user)
})

