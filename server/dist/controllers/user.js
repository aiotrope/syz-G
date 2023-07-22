"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _cloudinary = require("cloudinary");
var _isomorphicDompurify = require("isomorphic-dompurify");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = _interopRequireDefault(require("../models/user"));
var _post = _interopRequireDefault(require("../models/post"));
var _comment = _interopRequireDefault(require("../models/comment"));
var _validators = _interopRequireDefault(require("../utils/validators"));
require('express-async-errors');
//import logger from '../utils/logger'
// return an array of users objects with id, email, username, isStaff and timestamps
const getAll = async (req, res) => {
  try {
    const users = await _user.default.find({}).select({
      hashedPassword: 0
    }).populate('posts');
    if (!users) throw Error('Problem fetching users');
    return res.status(200).json(users);
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};

//create new user with request body of email, password and confirm

const signup = async (req, res) => {
  const foundUserEmail = await _user.default.findOne({
    email: req.body.email
  });
  const foundUserUsername = await _user.default.findOne({
    username: req.body.username
  });
  if (foundUserEmail) throw Error('Cannot use the email provided');
  if (foundUserUsername) throw Error('Cannot use the username provided');
  try {
    const validData = _validators.default.signupSchema.validate(req.body);
    if (validData.error) {
      return res.status(400).json({
        error: validData.error.details[0].message
      });
    } else {
      const saltRounds = 10;
      const hashed = await _bcrypt.default.hash(req.body.password, saltRounds);
      const user = new _user.default({
        email: (0, _isomorphicDompurify.sanitize)(validData.value.email),
        username: (0, _isomorphicDompurify.sanitize)(validData.value.username),
        hashedPassword: hashed
      });
      await user.save();
      return res.status(201).json({
        message: `${user.email} created`,
        user
      });
    }
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};

// login user with email and password

const signin = async (req, res) => {
  let {
    email,
    password
  } = req.body;
  const validData = _validators.default.signinSchema.validate(req.body);
  if (validData.error) {
    return res.status(400).json({
      error: validData.error.details[0].message
    });
  }
  try {
    const user = await _user.default.findOne({
      email
    });
    const correctPassword = user === null ? false : await _bcrypt.default.compare(password, user.hashedPassword);
    if (!(user && correctPassword)) throw Error('Incorrect login credentials');
    const payload = {
      id: user.id,
      email: user.email,
      username: user.username
    };
    const token = _jsonwebtoken.default.sign(payload, _config.default.jwt_secret, {
      expiresIn: '2h'
    });
    const decoded = _jsonwebtoken.default.verify(token, _config.default.jwt_secret);
    res.status(200).json({
      message: `${decoded.email} signed-in`,
      access: token
    });
  } catch (err) {
    res.status(401).json({
      error: err.message
    });
  }
};

// get user using params id

const getMe = async (req, res) => {
  const {
    id
  } = req.params;
  if (req.user.id !== id) return res.status(401).json({
    error: `Not allowed to fetch ${req.user.username}`
  });
  try {
    const user = await _user.default.findById(id).select({
      hashedPassword: 0
    }).populate('posts', {
      id: 1,
      title: 1,
      tags: 1,
      description: 1,
      entry: 1,
      user: 1,
      comments: 1,
      createdAt: 1,
      updatedAt: 1
    }).populate({
      path: 'comments',
      populate: {
        path: 'commentOn',
        populate: {
          path: 'user'
        }
      }
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const getUserById = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const user = await _user.default.findById(id).select({
      hashedPassword: 0
    }).populate('posts', {
      id: 1,
      title: 1,
      tags: 1,
      description: 1,
      entry: 1,
      user: 1,
      comments: 1,
      createdAt: 1,
      updatedAt: 1
    }).populate({
      path: 'comments',
      populate: {
        path: 'commentOn',
        populate: {
          path: 'user'
        }
      }
    });
    return res.status(200).json(user);
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const updateUserAvatar = async (req, res) => {
  const {
    image
  } = req.body; //base64 format

  const {
    id
  } = req.params;
  _cloudinary.v2.config({
    cloud_name: _config.default.cloudinary_name,
    api_key: _config.default.cloudinary_key,
    api_secret: _config.default.cloudinary_secret
  });
  const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: 'auto'
  };
  if (req.user.id !== id) return res.status(403).json({
    error: `Not allowed to update ${req.user.username}`
  });
  try {
    const uploader = await _cloudinary.v2.uploader.upload(image, opts);
    if (uploader.secure_url) {
      let user = await _user.default.findById(id);
      if (user) {
        user.avatar = (0, _isomorphicDompurify.sanitize)(uploader.secure_url);
        await user.save();
        return res.status(200).json({
          message: `${user.username} avatar updated`,
          user: user
        });
      }
    }
  } catch (err) {
    return res.status(422).json({
      error: err.message
    });
  }
};
const updateUser = async (req, res) => {
  const {
    id
  } = req.params;
  const validData = _validators.default.updateUserSchema.validate(req.body);
  if (validData.error) return res.status(400).json({
    error: validData.error.details[0].message
  });
  if (req.user.id !== id) return res.status(403).json({
    error: `Not allowed to update ${req.user.username}`
  });
  try {
    let user = await _user.default.findById(req.user.id).select({
      hashedPassword: 0
    }).populate('posts', {
      id: 1,
      title: 1,
      tags: 1,
      description: 1,
      entry: 1,
      user: 1,
      comments: 1,
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
    if (user) {
      user.username = (0, _isomorphicDompurify.sanitize)(validData.value.username);
      user.email = (0, _isomorphicDompurify.sanitize)(validData.value.email);
      user.bio = (0, _isomorphicDompurify.sanitize)(validData.value.bio);
      await user.save();
      return res.status(200).json({
        message: `${user.username} profile updated`,
        user: user
      });
    }
  } catch (err) {
    //console.log(req.user.id)
    return res.status(400).json({
      error: err.message
    });
  }
};
const deleteAccount = async (req, res) => {
  const {
    id
  } = req.params;
  const user = req.user;
  if (user.id !== id) return res.status(403).json({
    error: `Not allowed to update ${req.user.username}`
  });
  if (!_mongoose.default.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: `${id} is not valid user id!`
    });
  }
  try {
    const userToDelete = await _user.default.findByIdAndDelete(id).populate('posts').populate('comments');
    await _post.default.deleteMany({
      user: _mongoose.default.Types.ObjectId(user.id)
    });
    await _comment.default.deleteMany({
      commenter: _mongoose.default.Types.ObjectId(id)
    });
    if (!userToDelete) return res.status(404).json({
      error: 'User not found'
    });
    res.status(204).end();
  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
};
const userController = {
  getAll,
  signup,
  signin,
  getMe,
  getUserById,
  updateUserAvatar,
  updateUser,
  deleteAccount
};
var _default = userController;
exports.default = _default;