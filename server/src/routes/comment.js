import express from 'express'

import commentController from '../controllers/comment'
import authMiddleware from '../middlewares/auth'

const router = express.Router()

router.post(
  '/:postId',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  commentController.createComment
)

router.get('/:id', commentController.getCommentById)

router.delete(
  '/delete/:id',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  commentController.deleteComment
)

router.patch(
  '/update/:id',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  commentController.updateComment
)

export default router
