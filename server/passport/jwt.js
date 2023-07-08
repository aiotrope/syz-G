const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
  passReqToCallback: true,
}

const jwtLogin = (passport) => {
  passport.use(
    new JwtStrategy(options, async (req, payload, done) => {
      try {
        const user = await User.findById(payload.id)
        if (user) {
          req.user = user // current user Obj

          return done(null, user)
        }

        return done(null, false)
      } catch (err) {
        done(err, false)
      }
    })
  )
}

module.exports = jwtLogin
