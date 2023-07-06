import config from '../utils/config.mjs'
import express from 'express'
import passport from 'passport'

import fbController from '../controllers/fb.mjs'
import { checkAuthSession } from '../middlewares/auth.mjs'
import logger from '../utils/logger.mjs'

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

export { router as fbRouter }
