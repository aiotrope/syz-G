import express from 'express'
import passport from 'passport'

import userController from '../controllers/user'
import ensureAuth from '../middlewares/auth'

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/', userController.getAll)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getJwtUserById
)

router.delete('/signout/:id', ensureAuth.checkAuth, userController.signout)

export default router