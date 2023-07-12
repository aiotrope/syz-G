"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true
  },
  username: {
    type: String,
    trim: true,
    required: true
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
    default: 'https://ui-avatars.com/api/?name=xz&bold=true&size=70&color=a0a0a0'
  },
  bio: {
    type: String,
    required: true,
    default: function _default() {
      return "Hello, World! I'm ".concat(this.username);
    }
  }
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

/* UserSchema.pre('save', function(next) {
  this.bio = `Hello, World! I'm ${this.username}.`
  next()
}) */

var User = (0, _mongoose.model)('User', UserSchema);
var _default2 = User;
exports.default = _default2;