import express from 'express'

import userController from '../controllers/user'
import authMiddleware from '../middlewares/auth'

const router = express.Router()

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.get('/', userController.getAll)

router.patch(
  '/avatar',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  userController.createAvatar
)

router.get(
  '/:id',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  userController.getUserById
)

router.get('/avatar/:id', userController.getUserAvatar)

export default router
