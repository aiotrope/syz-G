import express from 'express'

import postController from '../controllers/post'
import authMiddleware from '../middlewares/auth'

const router = express.Router()

router.post(
  '/',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  postController.createPost
)

router.get('/:id', postController.getPostById)

router.get('/', postController.getPosts)

router.delete(
  '/delete/:id',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  postController.deletePost
)

router.patch(
  '/:id',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  postController.updatePost
)

export default router
