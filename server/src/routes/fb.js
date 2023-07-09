import config from '../config'
import express from 'express'
import passport from 'passport'

import fbController from '../controllers/fb'
import ensureAuth from '../middlewares/auth'
import logger from '../utils/logger'

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
    logger.warn('USER = require( CB SESS ', JSON.parse(sess.user))
    res.cookie('googleUser', JSON.parse(sess.user))
  }
)

router.get('/user', ensureAuth.checkAuth, fbController.getFbUserAccessToken)

export default router
