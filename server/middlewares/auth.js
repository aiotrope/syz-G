const createHttpError = require('http-errors')
const cache = require('../utils/redis')

const checkAuthSession = async (req, res, next) => {
  const sess = req.session
  const currentUser = await cache.getAsync('currentUser')
  if (sess || currentUser) {
    return next()
  } else {
    next(createHttpError(401))
  }
}

const auth = {
  checkAuthSession,
}

module.exports = auth
