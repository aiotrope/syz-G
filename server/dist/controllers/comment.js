"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _isomorphicDompurify = require("isomorphic-dompurify");
var _comment = _interopRequireDefault(require("../models/comment"));
var _post = _interopRequireDefault(require("../models/post"));
var _user = _interopRequireDefault(require("../models/user"));
var _validators = _interopRequireDefault(require("../utils/validators"));
var createComment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var postId, user, post, validData, newComment, comment, createdComment;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          postId = req.params.postId;
          user = req.user;
          _context.next = 4;
          return _post.default.findById(postId);
        case 4:
          post = _context.sent;
          validData = _validators.default.createCommentSchema.validate(req.body);
          if (post) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            error: 'Post not found'
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
          if (_mongoose.default.Types.ObjectId.isValid(postId)) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            error: "".concat(postId, " is not valid post id!")
          }));
        case 12:
          _context.prev = 12;
          newComment = new _comment.default({
            commentary: (0, _isomorphicDompurify.sanitize)(validData.value.commentary),
            commenter: _mongoose.default.Types.ObjectId(user.id),
            commentOn: _mongoose.default.Types.ObjectId(post.id)
          });
          _context.next = 16;
          return _comment.default.create(newComment);
        case 16:
          comment = _context.sent;
          if (!comment) {
            _context.next = 28;
            break;
          }
          user.comments = user.comments.concat(comment);
          post.comments = post.comments.concat(comment);
          _context.next = 22;
          return user.save();
        case 22:
          _context.next = 24;
          return post.save();
        case 24:
          _context.next = 26;
          return _comment.default.findById(comment.id).populate('commenter', {
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
        case 26:
          createdComment = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            message: "".concat(user.username, " commented on post: ").concat(post.title),
            comment: createdComment
          }));
        case 28:
          _context.next = 33;
          break;
        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](12);
          return _context.abrupt("return", res.status(422).json({
            error: _context.t0.message
          }));
        case 33:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[12, 30]]);
  }));
  return function createComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var deleteComment = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var _comment$commenter;
    var id, user, comment;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _context2.next = 4;
          return _comment.default.findById(id).populate('commenter', {
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
        case 4:
          comment = _context2.sent;
          if (!((comment === null || comment === void 0 || (_comment$commenter = comment.commenter) === null || _comment$commenter === void 0 ? void 0 : _comment$commenter.id) !== user.id)) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(403).json({
            error: "Not allowed to delete comment with ID: ".concat(comment.id)
          }));
        case 7:
          if (_mongoose.default.Types.ObjectId.isValid(id)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: "".concat(id, " is not valid comment id!")
          }));
        case 9:
          if (comment) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            error: 'Comment not found'
          }));
        case 11:
          _context2.prev = 11;
          _context2.next = 14;
          return _comment.default.findByIdAndDelete(id);
        case 14:
          _context2.next = 16;
          return _user.default.updateOne({
            comments: id
          }, {
            $pull: {
              comments: id
            }
          }, {
            multi: true,
            new: true
          });
        case 16:
          _context2.next = 18;
          return _post.default.updateOne({
            comments: id
          }, {
            $pull: {
              comments: id
            }
          }, {
            multi: true,
            new: true
          });
        case 18:
          return _context2.abrupt("return", res.status(204).end());
        case 21:
          _context2.prev = 21;
          _context2.t0 = _context2["catch"](11);
          return _context2.abrupt("return", res.status(422).json({
            error: _context2.t0.message
          }));
        case 24:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[11, 21]]);
  }));
  return function deleteComment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var updateComment = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var id, user, comment, validData;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          _context3.next = 4;
          return _comment.default.findById(id).populate('commenter', {
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
        case 4:
          comment = _context3.sent;
          validData = _validators.default.updateCommentSchema.validate(req.body);
          if (!(comment.commenter.id !== user.id)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(403).json({
            error: "Not allowed to update comment ID:  ".concat(comment.id)
          }));
        case 8:
          if (!validData.error) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: validData.error.details[0].message
          }));
        case 10:
          if (comment) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            error: 'Comment not found!'
          }));
        case 12:
          _context3.prev = 12;
          comment.commentary = (0, _isomorphicDompurify.sanitize)(validData.value.commentary);
          _context3.next = 16;
          return comment.save();
        case 16:
          res.status(200).json({
            message: "".concat(user.username, " updated ").concat(comment.id),
            comment: comment
          });
          _context3.next = 22;
          break;
        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](12);
          return _context3.abrupt("return", res.status(422).json({
            error: _context3.t0.message
          }));
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[12, 19]]);
  }));
  return function updateComment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getCommentById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var id, comment;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          if (_mongoose.default.Types.ObjectId.isValid(id)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            error: "".concat(id, " is not valid comment id!")
          }));
        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return _comment.default.findById(id).populate('commenter', {
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
        case 6:
          comment = _context4.sent;
          if (comment) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            error: 'Comment not found!'
          }));
        case 9:
          res.status(200).json(comment);
          _context4.next = 15;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](3);
          return _context4.abrupt("return", res.status(422).json({
            error: _context4.t0.message
          }));
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 12]]);
  }));
  return function getCommentById(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getCommentsByPostId = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var postId, post, comment;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          postId = req.params.postId;
          _context5.next = 3;
          return _post.default.findById(postId).populate('user', {
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
        case 3:
          post = _context5.sent;
          if (_mongoose.default.Types.ObjectId.isValid(postId)) {
            _context5.next = 6;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            error: "".concat(postId, " is not valid post id!")
          }));
        case 6:
          _context5.prev = 6;
          _context5.next = 9;
          return _comment.default.find({
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
        case 9:
          comment = _context5.sent;
          if (comment) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            error: 'Comment not found!'
          }));
        case 12:
          res.status(200).json(comment);
          _context5.next = 18;
          break;
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
  return function getCommentsByPostId(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var getComments = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(req, res) {
    var comments;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _comment.default.find({}).populate('commenter', {
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
        case 3:
          comments = _context6.sent;
          return _context6.abrupt("return", res.status(200).json(comments));
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(422).json({
            error: _context6.t0.message
          }));
        case 10:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function getComments(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var commentController = {
  createComment: createComment,
  deleteComment: deleteComment,
  updateComment: updateComment,
  getCommentById: getCommentById,
  getComments: getComments,
  getCommentsByPostId: getCommentsByPostId
};
var _default = commentController;
exports.default = _default;