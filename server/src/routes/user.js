import express from 'express'

import userController from '../controllers/user'
import authMiddleware from '../middlewares/auth'

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/all', userController.getAll)

router.get(
  '/me',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  userController.getMe
)

router.patch(
  '/update/:id',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  userController.updateUser
)

router.patch(
  '/update/avatar/:id',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  userController.updateUserAvatar
)

export default router
