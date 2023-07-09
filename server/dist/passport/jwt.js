"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtLogin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../config"));
var _passportJwt = require("passport-jwt");
var _user = _interopRequireDefault(require("../models/user"));
var options = {
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: _config.default.jwt_secret,
  passReqToCallback: true
};
var jwtLogin = function jwtLogin(passport) {
  passport.use(new _passportJwt.Strategy(options, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, payload, done) {
      var user;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _user.default.findById(payload.id);
          case 3:
            user = _context.sent;
            if (!user) {
              _context.next = 7;
              break;
            }
            req.user = user;
            return _context.abrupt("return", done(null, user));
          case 7:
            return _context.abrupt("return", done(null, false));
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            done(_context.t0, false);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 10]]);
    }));
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }()));
};
exports.jwtLogin = jwtLogin;