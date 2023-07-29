import express from 'express'
import User from '../models/user'
import Post from '../models/post'
import Comment from '../models/comment'

const router = express.Router()

router.post('/reset', async (req, res) => {
  await Comment.deleteMany({})
  await Post.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

export default router
