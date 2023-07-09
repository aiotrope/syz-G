import config from '../config'
import express from 'express'
import passport from 'passport'

import googleController from '../controllers/google'
import ensureAuth from '../middlewares/auth'

const router = express.Router()

router.get(
  '/',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
)

router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: config.success_redirect,
    failureRedirect: config.failure_redirect,
    session: false,
  })
)

router.get(
  '/user',
  ensureAuth.checkAuth,
  googleController.getGoogleUserAccessToken
)

export default router
