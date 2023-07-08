import config from '../config.js'
import express from 'express'
import passport from 'passport'

import fbController from '../controllers/fb.js'
import { checkAuthSession } from '../middlewares/auth.js'
import logger from '../utils/logger.js'

const router = express.Router()

router.get(
  '/',
  passport.authenticate('facebook', { scope: ['profile', 'email'] })
)

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: config.success_redirect,
    failureRedirect: config.failure_redirect,
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