"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _isomorphicDompurify = require("isomorphic-dompurify");
var _comment = _interopRequireDefault(require("../models/comment"));
var _post = _interopRequireDefault(require("../models/post"));
var _user = _interopRequireDefault(require("../models/user"));
var _validators = _interopRequireDefault(require("../utils/validators"));
// creating comments with post id params and commentary as re.body
const createComment = async (req, res) => {
  const {
    postId
  } = req.params;
  const user = req.user;
  const post = await _post.default.findById(postId);
  const validData = _validators.default.createCommentSchema.validate(req.body);
  if (!post) return res.status(404).json({
    error: 'Post not found'
  });
  if (validData.error) {
    return res.status(400).json({
      error: validData.error.details[0].message
    });
  }
  if (!_mongoose.default.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      error: `${postId} is not valid post id!`
    });
  }
  try {
    const newComment = new _comment.default({
      commentary: (0, _isomorphicDompurify.sanitize)(validData.value.commentary),
      commenter: _mongoose.default.Types.ObjectId(user.id),
      commentOn: _mongoose.default.Types.ObjectId(post.id)
    });
    const comment = await _comment.default.create(newComment);
    if (comment) {
      user.comments = user.comments.concat(comment);
      post.comments = post.comments.concat(comment);
      await user.save();
      await post.save();
      const createdComment = await _comment.default.findById(comment.id).populate('commenter', {
        id: 1,
        username: 1,
        email: 1,
        posts: 1,
        comments: 1,
        isStaff: 1,
        avatar: 1,
        bio: 1,
        createdAt: 1,
        updatedAt: 1
      }).populate('commentOn', {
        id: 1,
        title: 1,
        tags: 1,
        description: 1,
        entry: 1,
        user: 1,
        comments: 1,
        createdAt: 1,
        updatedAt: 1
      });
      return res.status(201).json({
        message: `${user.username} commented on post: ${post.title}`,
        comment: createdComment
      });
    }
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};

// delete comment with comment id param by req.user
const deleteComment = async (req, res) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const comment = await _comment.default.findById(id).populate('commenter', {
    id: 1,
    username: 1,
    email: 1,
    posts: 1,
    comments: 1,
    isStaff: 1,
    avatar: 1,
    bio: 1,
    createdAt: 1,
    updatedAt: 1
  });
  if (comment?.commenter?.id !== user.id) return res.status(403).json({
    error: `Not allowed to delete comment with ID: ${comment.id}`
  });
  if (!_mongoose.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: `${id} is not valid comment id!`
    });
  }
  if (!comment) return res.status(404).json({
    error: 'Comment not found'
  });
  try {
    await _comment.default.findByIdAndDelete(id);
    await _user.default.updateOne({
      comments: id
    }, {
      $pull: {
        comments: id
      }
    }, {
      multi: true,
      new: true
    });
    await _post.default.updateOne({
      comments: id
    }, {
      $pull: {
        comments: id
      }
    }, {
      multi: true,
      new: true
    });
    return res.status(204).end();
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};

// updating comment with comment id param by req.user
const updateComment = async (req, res) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const comment = await _comment.default.findById(id).populate('commenter', {
    id: 1,
    username: 1,
    email: 1,
    posts: 1,
    comments: 1,
    isStaff: 1,
    avatar: 1,
    bio: 1,
    createdAt: 1,
    updatedAt: 1
  }).populate('commentOn', {
    id: 1,
    title: 1,
    tags: 1,
    description: 1,
    entry: 1,
    user: 1,
    comments: 1,
    createdAt: 1,
    updatedAt: 1
  });
  const validData = _validators.default.updateCommentSchema.validate(req.body);
  if (comment.commenter.id !== user.id) return res.status(403).json({
    error: `Not allowed to update comment ID:  ${comment.id}`
  });
  if (validData.error) {
    return res.status(400).json({
      error: validData.error.details[0].message
    });
  }
  if (!comment) return res.status(404).json({
    error: 'Comment not found!'
  });
  try {
    comment.commentary = (0, _isomorphicDompurify.sanitize)(validData.value.commentary);
    await comment.save();
    return res.status(200).json({
      message: `${user.username} updated ${comment.id}`,
      comment: comment
    });
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};

// get comment by comment id
const getCommentById = async (req, res) => {
  const {
    id
  } = req.params;
  if (!_mongoose.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: `${id} is not valid comment id!`
    });
  }
  try {
    const comment = await _comment.default.findById(id).populate('commenter', {
      id: 1,
      username: 1,
      email: 1,
      posts: 1,
      comments: 1,
      isStaff: 1,
      avatar: 1,
      bio: 1,
      createdAt: 1,
      updatedAt: 1
    }).populate('commentOn', {
      id: 1,
      title: 1,
      tags: 1,
      description: 1,
      entry: 1,
      user: 1,
      comments: 1,
      createdAt: 1,
      updatedAt: 1
    });
    if (!comment) return res.status(404).json({
      error: 'Comment not found!'
    });
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};

// get all comments by post snippet id
const getCommentsByPostId = async (req, res) => {
  const {
    postId
  } = req.params;
  const post = await _post.default.findById(postId).populate('user', {
    id: 1,
    username: 1,
    email: 1,
    posts: 1,
    comments: 1,
    isStaff: 1,
    avatar: 1,
    bio: 1,
    createdAt: 1,
    updatedAt: 1
  }).populate('comments', {
    id: 1,
    commentary: 1,
    commentOn: 1,
    commenter: 1,
    createdAt: 1,
    updatedAt: 1
  });
  if (!_mongoose.default.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      error: `${postId} is not valid post id!`
    });
  }
  try {
    const comment = await _comment.default.find({
      commentOn: post.id
    }).populate('commenter', {
      id: 1,
      username: 1,
      email: 1,
      posts: 1,
      comments: 1,
      isStaff: 1,
      avatar: 1,
      bio: 1,
      createdAt: 1,
      updatedAt: 1
    }).populate('commentOn', {
      id: 1,
      title: 1,
      tags: 1,
      description: 1,
      entry: 1,
      user: 1,
      comments: 1,
      createdAt: 1,
      updatedAt: 1
    });
    if (!comment) return res.status(404).json({
      error: 'Comment not found!'
    });
    return res.status(200).json(comment);
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};

// get all comments by user id as param
const getCommentsByUser = async (req, res) => {
  const {
    id
  } = req.params;
  const user = await _user.default.findById(_mongoose.default.Types.ObjectId(id));
  if (!user) return res.status(404).json({
    error: 'User not found'
  });
  if (!_mongoose.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: `${id} is not valid post id!`
    });
  }
  try {
    const comments = await _comment.default.find({
      commenter: _mongoose.default.Types.ObjectId(user.id)
    });
    if (comments) {
      //console.log(comments)
      return res.status(200).json(comments);
    }
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const commentController = {
  createComment,
  deleteComment,
  updateComment,
  getCommentById,
  getCommentsByPostId,
  getCommentsByUser
};
var _default = commentController;
exports.default = _default;