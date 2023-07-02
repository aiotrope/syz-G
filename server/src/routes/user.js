//import config from '../utils/config'
import express from 'express'
import passport from 'passport'
//import jwt from 'jsonwebtoken'

import userController from '../controllers/user'


//import logger from '../utils/logger'

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/', userController.getAll)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getJwtUserById
)

export default router
