import config from '../../utils/config'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

import User from '../../models/user'

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt_secret,
  passReqToCallback: true,
}

passport.use(
  new Strategy(options, async (req, payload, done) => {
    const currentUser = await User.findById(payload.id)
    if (currentUser) {
      req.currentUser = currentUser

      return done(null, currentUser)
    }

    return done(null, false)
  })
)
