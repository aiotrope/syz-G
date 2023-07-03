import config from '../utils/config'
import express from 'express'
import passport from 'passport'

import googleController from '../controllers/google'
import { checkAuthenticated } from '../middlewares/auth'
import jwt from 'jsonwebtoken'
//import logger from '../utils/logger'

const router = express.Router()

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/callback',
  passport.authenticate('google', {
    //successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/login',
    session: false,
  }),
  (req, res) => {
    const user = req.user
    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
      }
      const token = jwt.sign(payload, config.jwt_secret, { expiresIn: '1h' })
      res.cookie('googleAccess', token)
      //res.status(200).json({ access: token })
      res.redirect('http://localhost:5173')
    } else {
      return res.redirect('http://localhost:5173/login')
    }
  }
)

router.get('/user', checkAuthenticated, googleController.getGoogleUser)

export default router
