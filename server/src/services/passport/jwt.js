import config from '../../utils/config'
import { Strategy, ExtractJwt } from 'passport-jwt'

import User from '../../models/user'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
  passReqToCallback: true,
}

export const jwtStrategy = (passport) => {
  passport.use(
    new Strategy(options, async (req, payload, cb) => {
      const user = await User.findById(payload.id)
      if (user) {
        req.user = user

        return cb(null, user)
      }

      return cb(null, false)
    })
  )
}
