"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _post = _interopRequireDefault(require("../models/post"));
var _validators = _interopRequireDefault(require("../utils/validators"));
//import config from '../config'

var createPost = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var title, user, foundPost, validData, newPost, post;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          title = req.body.title;
          user = req.user;
          _context.next = 4;
          return _post.default.findOne({
            title: title
          });
        case 4:
          foundPost = _context.sent;
          validData = _validators.default.createPostSchema.validate(req.body);
          if (!foundPost) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: 'Cannot use the title provided'
          }));
        case 8:
          if (!validData.error) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: validData.error.details[0].message
          }));
        case 10:
          _context.prev = 10;
          newPost = new _post.default({
            title: validData.value.title,
            tag: validData.value.tag,
            entry: validData.value.entry,
            user: _mongoose.default.Types.ObjectId(user.id)
          });
          _context.next = 14;
          return _post.default.create(newPost);
        case 14:
          post = _context.sent;
          if (!post) {
            _context.next = 20;
            break;
          }
          user.posts = user.posts.concat(post);
          _context.next = 19;
          return user.save();
        case 19:
          return _context.abrupt("return", res.status(201).json({
            message: "".concat(post.title, " created!"),
            post: post
          }));
        case 20:
          _context.next = 25;
          break;
        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](10);
          return _context.abrupt("return", res.status(422).json({
            error: _context.t0.message
          }));
        case 25:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[10, 22]]);
  }));
  return function createPost(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getPostById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var id, post;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          if (id) {
            _context2.next = 3;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            error: 'Post not found'
          }));
        case 3:
          _context2.prev = 3;
          _context2.next = 6;
          return _post.default.findById(id).populate('user');
        case 6:
          post = _context2.sent;
          res.status(200).json(post);
          _context2.next = 13;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](3);
          return _context2.abrupt("return", res.status(422).json({
            error: _context2.t0.message
          }));
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 10]]);
  }));
  return function getPostById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getPosts = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var posts;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _post.default.find({}).populate('user');
        case 3:
          posts = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(posts));
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.status(422).json({
            error: _context3.t0.message
          }));
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return function getPosts(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updatePost = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var id, post, validData, postToUpdate;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return _post.default.findById(id);
        case 3:
          post = _context4.sent;
          validData = _validators.default.updatePostSchema.validate(req.body);
          if (!(post.user.toString() !== req.user.id)) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(403).json({
            error: "Not allowed to update ".concat(post.title)
          }));
        case 7:
          if (!validData.error) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: validData.error.details[0].message
          }));
        case 9:
          _context4.prev = 9;
          _context4.next = 12;
          return _post.default.findByIdAndUpdate(post.id, req.body, {
            new: true
          });
        case 12:
          postToUpdate = _context4.sent;
          if (postToUpdate) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: 'Post not found'
          }));
        case 15:
          res.status(200).json({
            message: "".concat(post.title, " updated"),
            post: postToUpdate
          });
          _context4.next = 21;
          break;
        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4["catch"](9);
          return _context4.abrupt("return", res.status(422).json({
            error: _context4.t0.message
          }));
        case 21:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[9, 18]]);
  }));
  return function updatePost(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deletePost = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var id, post, postToDelete;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return _post.default.findById(id);
        case 3:
          post = _context5.sent;
          if (!(post.user.toString() !== req.user.id)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(403).json({
            error: "Not allowed to delete ".concat(post.title)
          }));
        case 6:
          _context5.prev = 6;
          _context5.next = 9;
          return _post.default.findByIdAndDelete(post.id);
        case 9:
          postToDelete = _context5.sent;
          if (postToDelete) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'Post not found'
          }));
        case 12:
          return _context5.abrupt("return", res.status(204).end());
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](6);
          return _context5.abrupt("return", res.status(422).json({
            error: _context5.t0.message
          }));
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[6, 15]]);
  }));
  return function deletePost(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var postController = {
  createPost: createPost,
  getPostById: getPostById,
  getPosts: getPosts,
  deletePost: deletePost,
  updatePost: updatePost
};
var _default = postController;
exports.default = _default;