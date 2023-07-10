"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../config"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
var tokenExtractor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var authorization;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          authorization = req.get('authorization');
          if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
            req.token = authorization.substring(7);
          } else {
            next((0, _httpErrors.default)(401));
          }
          next();
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function tokenExtractor(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var userExtractor = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res, next) {
    var token, decoded, currentUser;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          token = req.token;
          decoded = _jsonwebtoken.default.verify(token, _config.default.jwt_secret);
          _context2.next = 4;
          return _user.default.findById(decoded.id);
        case 4:
          currentUser = _context2.sent;
          if (!decoded) {
            next((0, _httpErrors.default)(401));
          }
          req.user = currentUser;
          next();
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function userExtractor(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();
var authMiddleware = {
  tokenExtractor: tokenExtractor,
  userExtractor: userExtractor
};
var _default = authMiddleware;
exports.default = _default;