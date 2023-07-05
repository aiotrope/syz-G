"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuthSession = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _redis = _interopRequireDefault(require("../utils/redis"));
var checkAuthSession = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res, next) {
    var sess, currentUser;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          sess = req.session;
          _context.next = 3;
          return _redis.default.getAsync('currentUser');
        case 3:
          currentUser = _context.sent;
          if (!(sess || currentUser)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", next());
        case 8:
          next((0, _httpErrors.default)(401));
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function checkAuthSession(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
exports.checkAuthSession = checkAuthSession;