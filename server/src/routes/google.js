//import config from '../utils/config'
import express from 'express'
import passport from 'passport'

import googleController from '../controllers/google'
import { checkAuthenticated } from '../middlewares/auth'
//import jwt from 'jsonwebtoken'

const router = express.Router()

router.get('', passport.authenticate('google', { scope: ['email', 'profile'] }))

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/login',
    session: true,
  })
)

router.get('/user', checkAuthenticated, googleController.getGoogleUser)

export default router
