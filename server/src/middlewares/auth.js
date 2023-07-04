import createHttpError from 'http-errors'
import cache from '../utils/redis'

export const checkAuthSession = async (req, res, next) => {
  const savedUser = await cache.getAsync('currentUser')
  const savedToken = await cache.getAsync('access')
  if (savedUser || savedToken) {
    return next()
  } else {
    next(createHttpError(401))
  }
}
