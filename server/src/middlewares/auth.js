import config from '../config'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

import User from '../models/user'

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  } else {
    next(createHttpError(401))
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const token = req.token

  const decoded = jwt.verify(token, config.jwt_secret)

  const currentUser = await User.findById(decoded.id)

  if (!decoded) {
    next(createHttpError(401))
  }
  req.user = currentUser

  next()
}

const authMiddleware = {
  tokenExtractor,
  userExtractor,
}

export default authMiddleware
