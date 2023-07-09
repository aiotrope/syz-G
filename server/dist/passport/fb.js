"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fbLogin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _passportFacebook = require("passport-facebook");
var _redis = _interopRequireDefault(require("../utils/redis"));
var _user = _interopRequireDefault(require("../models/user"));
var options = {
  clientID: _config.default.fb_client_id,
  clientSecret: _config.default.fb_client_secret,
  callbackURL: _config.default.fb_callback_url,
  passReqToCallback: true
};
var fbLogin = function fbLogin(passport) {
  passport.use(new _passportFacebook.Strategy(options, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, accessToken, refreshToken, profile, done) {
      var user, sess, newUser, payload, token;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.default.findOne({
              googleId: profile.id
            });
          case 2:
            user = _context.sent;
            sess = req.session;
            if (user) {
              _context.next = 14;
              break;
            }
            _context.next = 7;
            return _user.default.create({
              email: profile.email,
              username: profile.displayName,
              googleId: profile.id
              // photo: profile.picture
              // req.isAuthenticated()
            });
          case 7:
            newUser = _context.sent;
            if (!newUser) {
              _context.next = 14;
              break;
            }
            payload = {
              id: user.id,
              email: user.email,
              username: user.username
            };
            token = _jsonwebtoken.default.sign(payload, _config.default.jwt_secret, {
              expiresIn: '2h'
            });
            _context.next = 13;
            return _redis.default.setAsync('access', JSON.stringify(token));
          case 13:
            return _context.abrupt("return", done(null, newUser));
          case 14:
            if (!user) {
              _context.next = 19;
              break;
            }
            _context.next = 17;
            return _redis.default.setAsync('currentUser', JSON.stringify(user));
          case 17:
            sess.user = JSON.stringify(user);
            return _context.abrupt("return", done(null, user));
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2, _x3, _x4, _x5) {
      return _ref.apply(this, arguments);
    };
  }()));
};
exports.fbLogin = fbLogin;