//import config from '../config'
import mongoose from 'mongoose'
import { sanitize } from 'isomorphic-dompurify'

import Post from '../models/post'
import validators from '../utils/validators'

const createPost = async (req, res) => {
  const { title } = req.body

  const user = req.user
  const foundPost = await Post.findOne({ title: title })

  const validData = validators.createPostSchema.validate(req.body)

  if (foundPost)
    return res.status(400).json({ error: 'Cannot use the title provided' })

  if (validData.error) {
    return res.status(400).json({ error: validData.error.details[0].message })
  }

  try {
    const tag = sanitize(validData.value.tag)

    const newPost = new Post({
      title: sanitize(validData.value.title),
      tags: [tag],
      description: sanitize(validData.value.description),
      entry: sanitize(validData.value.entry),
      user: mongoose.Types.ObjectId(user.id),
    })

    const post = await Post.create(newPost)

    if (post) {
      user.posts = user.posts.concat(post)

      await user.save()

      return res.status(201).json({
        message: `You created new snippet: ${post.title}`,
        post: post,
      })
    }
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const getPostById = async (req, res) => {
  const { id } = req.params

  if (!id) return res.status(404).json({ error: 'Post not found' })

  try {
    const post = await Post.findById(id).populate('user')
    res.status(200).json(post)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user')

    return res.status(200).json(posts)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const updatePost = async (req, res) => {
  const { id } = req.params

  const post = await Post.findById(id)

  const validData = validators.updatePostSchema.validate(req.body)

  if (post.user.toString() !== req.user.id)
    return res
      .status(403)
      .json({ error: `Not allowed to update ${post.title}` })

  if (validData.error) {
    return res.status(400).json({ error: validData.error.details[0].message })
  }

  if (!post)
    return res.status(404).json({ error: 'Code snippet post not found!' })

  try {
    post.title = sanitize(validData.value.title)
    post.tags = sanitize(validData.value.tag)
    post.description = sanitize(validData.value.description)
    post.entry = sanitize(validData.value.entry)

    await post.save()

    res.status(200).json({ message: `${post.title} updated`, post: post })
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const deletePost = async (req, res) => {
  const { id } = req.params

  const post = await Post.findById(id)

  if (post.user.toString() !== req.user.id)
    return res
      .status(403)
      .json({ error: `Not allowed to delete ${post.title}` })

  try {
    const postToDelete = await Post.findByIdAndDelete(post.id)

    if (!postToDelete) return res.status(404).json({ error: 'Post not found' })

    return res.status(204).end()
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const postController = {
  createPost,
  getPostById,
  getPosts,
  deletePost,
  updatePost,
}

export default postController
