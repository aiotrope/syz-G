import config from '../../utils/config'
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt'
import User from '../../models/user'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
  passReqToCallback: true,
}

export const jwtLogin = (passport) => {
  passport.use(
    new jwtStrategy(options, async (req, payload, done) => {
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
