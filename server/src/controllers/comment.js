import mongoose from 'mongoose'
import { sanitize } from 'isomorphic-dompurify'

import Comment from '../models/comment'
import Post from '../models/post'
import User from '../models/user'
import validators from '../utils/validators'

const createComment = async (req, res) => {
  const { postId } = req.params

  const user = req.user

  const post = await Post.findById(postId)

  const validData = validators.createCommentSchema.validate(req.body)

  if (!post) return res.status(404).json({ error: 'Post not found' })

  if (validData.error) {
    return res.status(400).json({ error: validData.error.details[0].message })
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: `${postId} is not valid post id!` })
  }

  try {
    const newComment = new Comment({
      commentary: sanitize(validData.value.commentary),
      commenter: mongoose.Types.ObjectId(user.id),
      commentOn: mongoose.Types.ObjectId(post.id),
    })

    const comment = await Comment.create(newComment)

    if (comment) {
      user.comments = user.comments.concat(comment)

      post.comments = post.comments.concat(comment)

      await user.save()

      await post.save()

      const createdComment = await Comment.findById(comment.id)
        .populate('commenter', {
          id: 1,
          username: 1,
          email: 1,
          posts: 1,
          comments: 1,
          isStaff: 1,
          avatar: 1,
          bio: 1,
          createdAt: 1,
          updatedAt: 1,
        })
        .populate('commentOn', {
          id: 1,
          title: 1,
          tags: 1,
          description: 1,
          entry: 1,
          user: 1,
          comments: 1,
          createdAt: 1,
          updatedAt: 1,
        })

      return res.status(201).json({
        message: `${user.username} commented on post: ${post.title}`,
        comment: createdComment,
      })
    }
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const deleteComment = async (req, res) => {
  const { id } = req.params

  const user = req.user

  const comment = await Comment.findById(id).populate('commenter', {
    id: 1,
    username: 1,
    email: 1,
    posts: 1,
    comments: 1,
    isStaff: 1,
    avatar: 1,
    bio: 1,
    createdAt: 1,
    updatedAt: 1,
  })

  if (comment?.commenter?.id !== user.id)
    return res
      .status(403)
      .json({ error: `Not allowed to delete comment with ID: ${comment.id}` })

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: `${id} is not valid comment id!` })
  }

  if (!comment) return res.status(404).json({ error: 'Comment not found' })

  try {
    await Comment.findByIdAndDelete(id)

    await User.updateOne(
      { comments: id },
      { $pull: { comments: id } },
      { multi: true, new: true }
    )

    await Post.updateOne(
      { comments: id },
      { $pull: { comments: id } },
      { multi: true, new: true }
    )

    return res.status(204).end()
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const updateComment = async (req, res) => {
  const { id } = req.params

  const user = req.user

  const comment = await Comment.findById(id)
    .populate('commenter', {
      id: 1,
      username: 1,
      email: 1,
      posts: 1,
      comments: 1,
      isStaff: 1,
      avatar: 1,
      bio: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .populate('commentOn', {
      id: 1,
      title: 1,
      tags: 1,
      description: 1,
      entry: 1,
      user: 1,
      comments: 1,
      createdAt: 1,
      updatedAt: 1,
    })

  const validData = validators.updateCommentSchema.validate(req.body)

  if (comment.commenter.id !== user.id)
    return res
      .status(403)
      .json({ error: `Not allowed to update comment ID:  ${comment.id}` })

  if (validData.error) {
    return res.status(400).json({ error: validData.error.details[0].message })
  }

  if (!comment) return res.status(404).json({ error: 'Comment not found!' })

  try {
    comment.commentary = sanitize(validData.value.commentary)

    await comment.save()

    return res.status(200).json({
      message: `${user.username} updated ${comment.id}`,
      comment: comment,
    })
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const getCommentById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: `${id} is not valid comment id!` })
  }

  try {
    const comment = await Comment.findById(id)
      .populate('commenter', {
        id: 1,
        username: 1,
        email: 1,
        posts: 1,
        comments: 1,
        isStaff: 1,
        avatar: 1,
        bio: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .populate('commentOn', {
        id: 1,
        title: 1,
        tags: 1,
        description: 1,
        entry: 1,
        user: 1,
        comments: 1,
        createdAt: 1,
        updatedAt: 1,
      })
    if (!comment) return res.status(404).json({ error: 'Comment not found!' })

    return res.status(200).json(comment)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params

  const post = await Post.findById(postId)
    .populate('user', {
      id: 1,
      username: 1,
      email: 1,
      posts: 1,
      comments: 1,
      isStaff: 1,
      avatar: 1,
      bio: 1,
      createdAt: 1,
      updatedAt: 1,
    })
    .populate('comments', {
      id: 1,
      commentary: 1,
      commentOn: 1,
      commenter: 1,
      createdAt: 1,
      updatedAt: 1,
    })

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: `${postId} is not valid post id!` })
  }

  try {
    const comment = await Comment.find({
      commentOn: post.id,
    })
      .populate('commenter', {
        id: 1,
        username: 1,
        email: 1,
        posts: 1,
        comments: 1,
        isStaff: 1,
        avatar: 1,
        bio: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .populate('commentOn', {
        id: 1,
        title: 1,
        tags: 1,
        description: 1,
        entry: 1,
        user: 1,
        comments: 1,
        createdAt: 1,
        updatedAt: 1,
      })

    if (!comment) return res.status(404).json({ error: 'Comment not found!' })

    return res.status(200).json(comment)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}
const getCommentsByMe = async (req, res) => {
  const user = req.user
  try {
    const comment = await Comment.findOne({
      commenter: user.id,
    })
      .populate('commenter', {
        id: 1,
        username: 1,
        email: 1,
        posts: 1,
        comments: 1,
        isStaff: 1,
        avatar: 1,
        bio: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .populate('commentOn', {
        id: 1,
        title: 1,
        tags: 1,
        description: 1,
        entry: 1,
        user: 1,
        comments: 1,
        createdAt: 1,
        updatedAt: 1,
      })

    if (!comment) return res.status(404).json({ error: 'Comment not found!' })

    return res.status(200).json(comment)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const getCommentsByUser = async (req, res) => {
  const { id } = req.params

  const user = await User.findById(mongoose.Types.ObjectId(id))

  if (!user) return res.status(404).json({ error: 'User not found' })

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: `${id} is not valid post id!` })
  }

  try {
    const comments = await Comment.find({
      commenter: mongoose.Types.ObjectId(user.id),
    })
    if (comments) {
      console.log(comments)
      return res.status(200).json(comments)
    }
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate('commenter', {
        id: 1,
        username: 1,
        email: 1,
        posts: 1,
        comments: 1,
        isStaff: 1,
        avatar: 1,
        bio: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .populate('commentOn', {
        id: 1,
        title: 1,
        tags: 1,
        description: 1,
        entry: 1,
        user: 1,
        comments: 1,
        createdAt: 1,
        updatedAt: 1,
      })

    return res.status(200).json(comments)
  } catch (err) {
    return res.status(422).json({ error: err.message })
  }
}

const commentController = {
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
  getComments,
  getCommentsByPostId,
  getCommentsByMe,
  getCommentsByUser,
}

export default commentController
