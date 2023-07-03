import createHttpError from 'http-errors'

export const checkAuthenticated = (req, res, next) => {
  //const user = req.user
  if (req.user) {
    //req.session.currentUser = user
    next()
  } else {
    next(createHttpError(401))
  }
}
