"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
let avatar_url = 'https://ui-avatars.com/api/?name=xz&bold=true&size=70&color=a0a0a0';
const UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: false,
    default: null
  },
  isStaff: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    required: true,
    default: avatar_url
  },
  bio: {
    type: String,
    required: true,
    default: function () {
      return 'Hello, World!';
    }
  },
  posts: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
  timestamps: true
});
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
UserSchema.pre('deleteMany', {
  document: true,
  query: false
}, function (next) {
  this.model('Comment').deleteOne({
    commenter: this._id
  }, next);
});
const User = (0, _mongoose.model)('User', UserSchema);
var _default = User;
exports.default = _default;