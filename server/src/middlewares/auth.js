import createHttpError from 'http-errors'
import cache from '../utils/redis'

export const checkAuthSession = async (req, res, next) => {
  const sess = req.session
  const currentUser = await cache.getAsync('currentUser')
  if (sess || currentUser) {
    return next()
  } else {
    next(createHttpError(401))
  }
}
