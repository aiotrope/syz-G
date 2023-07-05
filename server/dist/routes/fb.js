"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../utils/config"));
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _fb = _interopRequireDefault(require("../controllers/fb"));
var _auth = require("../middlewares/auth");
var _logger = _interopRequireDefault(require("../utils/logger"));
//import cache from '../utils/redis'

var router = _express.default.Router();
router.get('/', _passport.default.authenticate('facebook', {
  scope: ['profile', 'email']
}));
router.get('/callback', _passport.default.authenticate('facebook', {
  successRedirect: _config.default.success_redirect,
  failureRedirect: _config.default.failure_redirect,
  session: true
}), /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var sess;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          sess = req.sess;
          _logger.default.warn('USER from CB SESS ', JSON.parse(sess.user));
          res.cookie('googleUser', JSON.parse(sess.user));
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/user', _auth.checkAuthSession, _fb.default.getFbUser);
var _default = router;
exports.default = _default;