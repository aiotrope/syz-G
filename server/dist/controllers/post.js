"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _isomorphicDompurify = require("isomorphic-dompurify");
var _post = _interopRequireDefault(require("../models/post"));
var _user = _interopRequireDefault(require("../models/user"));
var _comment = _interopRequireDefault(require("../models/comment"));
var _validators = _interopRequireDefault(require("../utils/validators"));
const createPost = async (req, res) => {
  const {
    title
  } = req.body;
  const user = req.user;
  const foundPost = await _post.default.findOne({
    title: title
  });
  const validData = _validators.default.createPostSchema.validate(req.body);
  if (foundPost) return res.status(400).json({
    error: 'Cannot use the title provided'
  });
  if (validData.error) {
    return res.status(400).json({
      error: validData.error.details[0].message
    });
  }
  try {
    const newPost = new _post.default({
      title: (0, _isomorphicDompurify.sanitize)(validData.value.title),
      description: (0, _isomorphicDompurify.sanitize)(validData.value.description),
      tags: validData.value.tag,
      entry: (0, _isomorphicDompurify.sanitize)(validData.value.entry),
      user: _mongoose.default.Types.ObjectId(user.id)
    });
    const post = await _post.default.create(newPost);
    if (post) {
      user.posts = user.posts.concat(post);
      await user.save();
      const createdPost = await _post.default.findById(post.id).populate('user', {
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
      return res.status(201).json({
        message: `${user.username} created new snippet: ${createdPost.title}`,
        post: createdPost
      });
    }
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const getPostById = async (req, res) => {
  const {
    id
  } = req.params;
  if (!_mongoose.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: `${id} is not valid post id!`
    });
  }
  try {
    const post = await _post.default.findById(id).populate('user', {
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
    if (!post) return res.status(404).json({
      error: 'Post not found'
    });
    res.status(200).json(post);
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const getPosts = async (req, res) => {
  const {
    search
  } = req.query;
  let posts;
  try {
    if (search) {
      posts = await _post.default.find({
        $or: [{
          title: search
        }, {
          tags: search
        }, {
          description: search
        }, {
          entry: search
        }]
      }).populate('user', {
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
      }).setOptions({
        sanitizeFilter: true
      });
      return res.status(200).json(posts);
    }
    posts = await _post.default.find().populate('user', {
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
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const updatePost = async (req, res) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const post = await _post.default.findById(id).populate('user', {
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
  const validData = _validators.default.updatePostSchema.validate(req.body);
  if (post.user.id !== user.id) return res.status(403).json({
    error: `Not allowed to update ${post.title}`
  });
  if (validData.error) {
    return res.status(400).json({
      error: validData.error.details[0].message
    });
  }
  if (!post) return res.status(404).json({
    error: 'Code snippet post not found!'
  });
  try {
    post.title = (0, _isomorphicDompurify.sanitize)(validData.value.title);
    post.description = (0, _isomorphicDompurify.sanitize)(validData.value.description);
    post.entry = (0, _isomorphicDompurify.sanitize)(validData.value.entry);
    await post.save();
    res.status(200).json({
      message: `${user.username} updated ${post.title}`,
      post: post
    });
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const deletePost = async (req, res) => {
  const {
    id
  } = req.params;
  const user = req.user;
  const post = await _post.default.findById(id).populate('user', {
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
  if (post?.user?.id !== user.id) return res.status(403).json({
    error: `Not allowed to delete ${post.title}`
  });
  if (!_mongoose.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: `${id} is not valid post id!`
    });
  }
  if (!post) return res.status(404).json({
    error: 'Post not found'
  });
  try {
    await _post.default.findByIdAndDelete(id);
    await _user.default.updateOne({
      posts: id
    }, {
      $pull: {
        posts: id
      }
    }, {
      multi: true,
      new: true
    });
    await _comment.default.deleteMany({
      commentOn: _mongoose.default.Types.ObjectId(id)
    });
    return res.status(204).end();
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const postController = {
  createPost,
  getPostById,
  getPosts,
  deletePost,
  updatePost
};
var _default = postController;
exports.default = _default;