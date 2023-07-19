"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var Schema = _mongoose.default.Schema;
var model = _mongoose.default.model;
var PostSchema = new Schema({
  title: {
    type: String,
    min: 5,
    unique: true,
    required: true
  },
  description: {
    type: String,
    min: 10,
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    min: 1,
    required: true
  }],
  entry: {
    type: String,
    min: 10,
    required: true
  },
  user: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
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
PostSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

/* PostSchema.pre('update', { document: true, query: false }, function (next) {
  this.model('User').update(
    {},
    { $pull: { posts: this._id } },
    { multi: true },
    next
  )
}) */
var Post = model('Post', PostSchema);
var _default = Post;
exports.default = _default;