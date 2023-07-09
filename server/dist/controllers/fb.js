"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _redis = _interopRequireDefault(require("../utils/redis"));
var getFbUserAccessToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var savedToken, parseToken, decoded;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _redis.default.getAsync('access');
        case 3:
          savedToken = _context.sent;
          parseToken = JSON.parse(savedToken);
          decoded = _jsonwebtoken.default.verify(parseToken, _config.default.jwt_secret);
          if (!decoded) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(200).json({
            success: "".concat(decoded.email, " signed-in"),
            access: parseToken
          }));
        case 8:
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(422).json({
            error: _context.t0.message
          }));
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getFbUserAccessToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var fbController = {
  getFbUserAccessToken: getFbUserAccessToken
};
var _default = fbController;
exports.default = _default;