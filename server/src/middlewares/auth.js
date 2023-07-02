import createHttpError from 'http-errors'

export const checkAuthenticated = (req, res, next) => {
  const user = req.user
  if (user || req.isAuthenticated()) {
    req.session.currentUser = user
    next()
  } else {
    next(createHttpError(401))
  }
}
