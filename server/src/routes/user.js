import express from 'express'
import passport from 'passport'

import userController from '../controllers/user'
//import logger from '../utils/logger'
import { checkAuthenticated } from '../middlewares/auth'

const router = express.Router()

//const successLoginUrl = 'http://127.0.0.1:5173/about'
//const errorLoginUrl = 'http://127.0.0.1:5173/login'

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/', userController.getAll)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getById
)

router.get(
  '/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

// callback route for google redirection
router.get(
  '/google/callback',
  passport.authenticate('google'),
  userController.getGoogleLoggedInUser
)

router.get('/google-user', checkAuthenticated, userController.googleLoginUser)

export default router
