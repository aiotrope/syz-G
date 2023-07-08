import express from 'express'
import passport from 'passport'

import userController from '../controllers/user.js'
import { checkAuthSession } from '../middlewares/auth.js'

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/', userController.getAll)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getJwtUserById
)

router.delete('/signout/:id', checkAuthSession, userController.signout)

export default router