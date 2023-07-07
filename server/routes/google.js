const config = require( '../config')
const express = require( 'express')
const passport = require( 'passport')

const googleController = require( '../controllers/google')
const { checkAuthSession } = require( '../middlewares/auth')
const logger = require( '../utils/logger')

const router = express.Router()

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/callback',
  passport.authenticate('google', {
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

router.get('/user', checkAuthSession, googleController.getGoogleUser)

module.exports = router
