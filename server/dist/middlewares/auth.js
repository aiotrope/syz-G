"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _redis = _interopRequireDefault(require("../utils/redis"));
var checkAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var access;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _redis.default.getAsync('access');
        case 2:
          access = _context.sent;
          if (!access) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", next());
        case 7:
          res.redirect('/api/user/signin');
        case 8:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function checkAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var ensureAuth = {
  checkAuth: checkAuth
};
var _default = ensureAuth;
exports.default = _default;