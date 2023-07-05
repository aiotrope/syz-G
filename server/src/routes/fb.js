import express from 'express'
import passport from 'passport'

import fbController from '../controllers/fb'
import { checkAuthSession } from '../middlewares/auth'
//import cache from '../utils/redis'
import logger from '../utils/logger'

const router = express.Router()

router.get(
  '/',
  passport.authenticate('facebook', { scope: ['profile', 'email'] })
)

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: 'http://localhost:5173/login',
    session: true,
  }),
  async (req, res) => {
    const sess = req.sess
    logger.warn('USER from CB SESS ', JSON.parse(sess.user))
    res.cookie('googleUser', JSON.parse(sess.user))
  }
)

router.get('/user', checkAuthSession, fbController.getFbUser)

export default router
