import express from 'express'
import User from '../models/user'
//import Blog = require('../models/blog')

const router = express.Router()

router.post('/reset', async(req, res) => {
  //await Post.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

export default router