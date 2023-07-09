import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  const pong = 'Hello World! From Xzymous.'
  res.status(200).json({ ping: pong })
})

export default router
