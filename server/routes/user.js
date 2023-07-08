const express = require('express')
const passport = require('passport')

const userController = require('../controllers/user')
const { checkAuthSession } = require('../middlewares/auth')

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/', userController.getAll)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getJwtUserById
)

router.delete('/signout/:id', checkAuthSession, userController.signout)

module.exports = router
