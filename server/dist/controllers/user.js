"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../config"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _cloudinary = require("cloudinary");
var _isomorphicDompurify = require("isomorphic-dompurify");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _user = _interopRequireDefault(require("../models/user"));
var _post = _interopRequireDefault(require("../models/post"));
var _validators = _interopRequireDefault(require("../utils/validators"));
require('express-async-errors');
//import logger from '../utils/logger'
// return an array of users objects with id, email, username, isStaff and timestamps
var getAll = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var users;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _user.default.find({}).select({
            hashedPassword: 0
          }).populate('posts');
        case 3:
          users = _context.sent;
          if (users) {
            _context.next = 6;
            break;
          }
          throw Error('Problem fetching users');
        case 6:
          return _context.abrupt("return", res.status(200).json(users));
        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(422).json({
            error: _context.t0.message
          }));
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 9]]);
  }));
  return function getAll(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//create new user with request body of email, password and confirm

var signup = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var foundUserEmail, foundUserUsername, validData, saltRounds, hashed, user;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user.default.findOne({
            email: req.body.email
          });
        case 2:
          foundUserEmail = _context2.sent;
          _context2.next = 5;
          return _user.default.findOne({
            username: req.body.username
          });
        case 5:
          foundUserUsername = _context2.sent;
          if (!foundUserEmail) {
            _context2.next = 8;
            break;
          }
          throw Error('Cannot use the email provided');
        case 8:
          if (!foundUserUsername) {
            _context2.next = 10;
            break;
          }
          throw Error('Cannot use the username provided');
        case 10:
          _context2.prev = 10;
          validData = _validators.default.signupSchema.validate(req.body);
          if (!validData.error) {
            _context2.next = 16;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            error: validData.error.details[0].message
          }));
        case 16:
          saltRounds = 10;
          _context2.next = 19;
          return _bcrypt.default.hash(req.body.password, saltRounds);
        case 19:
          hashed = _context2.sent;
          user = new _user.default({
            email: (0, _isomorphicDompurify.sanitize)(validData.value.email),
            username: (0, _isomorphicDompurify.sanitize)(validData.value.username),
            hashedPassword: hashed
          });
          _context2.next = 23;
          return user.save();
        case 23:
          return _context2.abrupt("return", res.status(201).json({
            message: "".concat(user.email, " created"),
            user: user
          }));
        case 24:
          _context2.next = 29;
          break;
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](10);
          return _context2.abrupt("return", res.status(422).json({
            error: _context2.t0.message
          }));
        case 29:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[10, 26]]);
  }));
  return function signup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// login user with email and password

var signin = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var _req$body, email, password, validData, user, correctPassword, payload, token, decoded;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          validData = _validators.default.signinSchema.validate(req.body);
          if (!validData.error) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            error: validData.error.details[0].message
          }));
        case 4:
          _context3.prev = 4;
          _context3.next = 7;
          return _user.default.findOne({
            email: email
          });
        case 7:
          user = _context3.sent;
          if (!(user === null)) {
            _context3.next = 12;
            break;
          }
          _context3.t0 = false;
          _context3.next = 15;
          break;
        case 12:
          _context3.next = 14;
          return _bcrypt.default.compare(password, user.hashedPassword);
        case 14:
          _context3.t0 = _context3.sent;
        case 15:
          correctPassword = _context3.t0;
          if (user && correctPassword) {
            _context3.next = 18;
            break;
          }
          throw Error('Incorrect login credentials');
        case 18:
          payload = {
            id: user.id,
            email: user.email,
            username: user.username
          };
          token = _jsonwebtoken.default.sign(payload, _config.default.jwt_secret, {
            expiresIn: '2h'
          });
          decoded = _jsonwebtoken.default.verify(token, _config.default.jwt_secret);
          res.status(200).json({
            message: "".concat(decoded.email, " signed-in"),
            access: token
          });
          _context3.next = 27;
          break;
        case 24:
          _context3.prev = 24;
          _context3.t1 = _context3["catch"](4);
          res.status(401).json({
            error: _context3.t1.message
          });
        case 27:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[4, 24]]);
  }));
  return function signin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

// get user using params id

var getMe = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var id, user;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          if (!(req.user.id !== id)) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(401).json({
            error: "Not allowed to fetch ".concat(req.user.username)
          }));
        case 3:
          _context4.prev = 3;
          _context4.next = 6;
          return _user.default.findById(id).select({
            hashedPassword: 0
          }).populate('posts', {
            id: 1,
            title: 1,
            tags: 1,
            description: 1,
            entry: 1,
            user: 1,
            createdAt: 1,
            updatedAt: 1
          });
        case 6:
          user = _context4.sent;
          return _context4.abrupt("return", res.status(200).json(user));
        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](3);
          return _context4.abrupt("return", res.status(422).json({
            error: _context4.t0.message
          }));
        case 13:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[3, 10]]);
  }));
  return function getMe(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
    var id, user;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return _user.default.findById(id).select({
            hashedPassword: 0
          }).populate('posts', {
            id: 1,
            title: 1,
            tags: 1,
            description: 1,
            entry: 1,
            user: 1,
            createdAt: 1,
            updatedAt: 1
          });
        case 4:
          user = _context5.sent;
          return _context5.abrupt("return", res.status(200).json(user));
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          return _context5.abrupt("return", res.status(422).json({
            error: _context5.t0.message
          }));
        case 11:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function getUserById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
var updateUserAvatar = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(req, res) {
    var image, id, opts, uploader, user;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          image = req.body.image; //base64 format
          id = req.params.id;
          _cloudinary.v2.config({
            cloud_name: _config.default.cloudinary_name,
            api_key: _config.default.cloudinary_key,
            api_secret: _config.default.cloudinary_secret
          });
          opts = {
            overwrite: true,
            invalidate: true,
            resource_type: 'auto'
          };
          if (!(req.user.id !== id)) {
            _context6.next = 6;
            break;
          }
          return _context6.abrupt("return", res.status(403).json({
            error: "Not allowed to update ".concat(req.user.username)
          }));
        case 6:
          _context6.prev = 6;
          _context6.next = 9;
          return _cloudinary.v2.uploader.upload(image, opts);
        case 9:
          uploader = _context6.sent;
          if (!uploader.secure_url) {
            _context6.next = 19;
            break;
          }
          _context6.next = 13;
          return _user.default.findById(id);
        case 13:
          user = _context6.sent;
          if (!user) {
            _context6.next = 19;
            break;
          }
          user.avatar = (0, _isomorphicDompurify.sanitize)(uploader.secure_url);
          _context6.next = 18;
          return user.save();
        case 18:
          return _context6.abrupt("return", res.status(200).json({
            message: "".concat(user.username, " avatar updated"),
            user: user
          }));
        case 19:
          _context6.next = 24;
          break;
        case 21:
          _context6.prev = 21;
          _context6.t0 = _context6["catch"](6);
          return _context6.abrupt("return", res.status(422).json({
            error: _context6.t0.message
          }));
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[6, 21]]);
  }));
  return function updateUserAvatar(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var updateUser = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(req, res) {
    var id, validData, user;
    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          validData = _validators.default.updateUserSchema.validate(req.body);
          if (!validData.error) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            error: validData.error.details[0].message
          }));
        case 4:
          if (!(req.user.id !== id)) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", res.status(403).json({
            error: "Not allowed to update ".concat(req.user.username)
          }));
        case 6:
          _context7.prev = 6;
          _context7.next = 9;
          return _user.default.findById(req.user.id).select({
            hashedPassword: 0
          }).populate('posts', {
            id: 1,
            title: 1,
            tags: 1,
            description: 1,
            entry: 1,
            user: 1,
            createdAt: 1,
            updatedAt: 1
          });
        case 9:
          user = _context7.sent;
          if (!user) {
            _context7.next = 17;
            break;
          }
          user.username = (0, _isomorphicDompurify.sanitize)(validData.value.username);
          user.email = (0, _isomorphicDompurify.sanitize)(validData.value.email);
          user.bio = (0, _isomorphicDompurify.sanitize)(validData.value.bio);
          _context7.next = 16;
          return user.save();
        case 16:
          return _context7.abrupt("return", res.status(200).json({
            message: "".concat(user.username, " profile updated"),
            user: user
          }));
        case 17:
          _context7.next = 22;
          break;
        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](6);
          return _context7.abrupt("return", res.status(400).json({
            error: _context7.t0.message
          }));
        case 22:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[6, 19]]);
  }));
  return function updateUser(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
var deleteAccount = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(req, res) {
    var id, user, userToDelete;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          user = req.user;
          if (!(user.id !== id)) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(403).json({
            error: "Not allowed to update ".concat(req.user.username)
          }));
        case 4:
          _context8.prev = 4;
          _context8.next = 7;
          return _user.default.findByIdAndDelete(id).populate('posts');
        case 7:
          userToDelete = _context8.sent;
          _context8.next = 10;
          return _post.default.deleteMany({
            user: _mongoose.default.Types.ObjectId(user.id)
          });
        case 10:
          if (userToDelete) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));
        case 12:
          res.status(204).end();
          _context8.next = 18;
          break;
        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](4);
          return _context8.abrupt("return", res.status(400).json({
            error: _context8.t0.message
          }));
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[4, 15]]);
  }));
  return function deleteAccount(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
var userController = {
  getAll: getAll,
  signup: signup,
  signin: signin,
  getMe: getMe,
  getUserById: getUserById,
  updateUserAvatar: updateUserAvatar,
  updateUser: updateUser,
  deleteAccount: deleteAccount
};
var _default = userController;
exports.default = _default;