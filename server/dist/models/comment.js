"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
const Schema = _mongoose.default.Schema;
const model = _mongoose.default.model;
const CommentSchema = new Schema({
  commentary: {
    type: String,
    min: 4,
    required: true
  },
  commenter: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  commentOn: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'Post'
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
CommentSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
const Comment = model('Comment', CommentSchema);
var _default = Comment;
exports.default = _default;