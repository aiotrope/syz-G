const config = require('../config')
const express = require('express')
const passport = require('passport')

const googleController = require('../controllers/google')
const ensureAuth = require('../middlewares/auth')
//const cache = require('../utils/redis')
//const logger = require('../utils/logger')

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

module.exports = router
