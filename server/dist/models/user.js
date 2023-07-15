"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var avatar_url = 'https://ui-avatars.com/api/?name=xz&bold=true&size=70&color=a0a0a0';
var UserSchema = new _mongoose.Schema({
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
    default: function _default() {
      return "Hello, World! I'm ".concat(this.username);
    }
  },
  posts: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Post'
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
UserSchema.pre('save', function (next) {
  if (this.avatar === null) {
    this.avatar = avatar_url;
  }
  next();
});
UserSchema.pre('deleteMany', function (next) {
  var user = this;
  user.model('Post').deleteOne({
    user: user.id
  }, next);
});
var User = (0, _mongoose.model)('User', UserSchema);
var _default2 = User;
exports.default = _default2;