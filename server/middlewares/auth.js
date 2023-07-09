//const createHttpError = require('http-errors')
const cache = require('../utils/redis')

const checkAuth = async (req, res, next) => {
  const access = await cache.getAsync('access')
  if (access) {
    return next()
  } else {
    res.redirect('/api/user/signin')
  }
}

const ensureAuth = {
  checkAuth,
}

module.exports = ensureAuth
