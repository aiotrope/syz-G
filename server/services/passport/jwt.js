const config = require('../../config')
const dotenv = require('dotenv')
dotenv.config()
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../../models/user')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
  passReqToCallback: true,
}

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
