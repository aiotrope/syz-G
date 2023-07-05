"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _redis = _interopRequireDefault(require("../utils/redis"));
var _logger = _interopRequireDefault(require("../utils/logger"));
var getGoogleUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var savedUser, userEmail;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _redis.default.getAsync('currentUser');
        case 3:
          savedUser = _context.sent;
          //const sess = req.session

          _logger.default.warn('USER FROM Google route ', JSON.parse(savedUser));
          userEmail = JSON.parse(savedUser).email;
          console.log(userEmail);
          return _context.abrupt("return", res.status(200).json({
            success: "".concat(userEmail, " signed-in"),
            googleUser: JSON.parse(savedUser)
          }));
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
  return function getGoogleUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var _default = {
  getGoogleUser: getGoogleUser
};
exports.default = _default;