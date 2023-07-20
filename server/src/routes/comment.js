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

router.get('/', commentController.getComments)

router.get('/:id', commentController.getCommentById)

router.get('/post/:postId', commentController.getCommentsByPostId)

router.get(
  '/me',
  authMiddleware.tokenExtractor,
  authMiddleware.userExtractor,
  commentController.getCommentsByMe
)

router.get(
  '/user/:id', // as user id
  commentController.getCommentsByUser
)

export default router
