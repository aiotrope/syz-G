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
    required: false,
    default: null
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
  googleId: {
    type: String,
    required: false,
    default: null
  },
  facebookId: {
    type: String,
    required: false,
    default: null
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
var User = (0, _mongoose.model)('User', UserSchema);
var _default = User;
exports.default = _default;