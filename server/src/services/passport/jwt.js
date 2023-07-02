import config from '../../utils/config'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

import User from '../../models/user'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
  passReqToCallback: true,
}
export const jwtLogin = (passport) => {
  passport.use(
    new JwtStrategy(options, async (req, payload, done) => {
      try {
        const user = await User.findOne({ email: payload.email })
        req.user = user
        if (user) {
          req.user = user // current user Obj

          return done(null, user)
        }

        return done(null, false)
      } catch (err) {
        console.error(err)
      }
    })
  )
}
