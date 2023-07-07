const config = require('../config')
const express = require('express')
const passport = require('passport')

const fbController = require('../controllers/fb')
const auth = require('../middlewares/auth')
const logger = require('../utils/logger')

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

router.get('/user', auth.checkAuthSession, fbController.getFbUser)

module.exports = router
