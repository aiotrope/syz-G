"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleLogin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../../utils/config"));
var _passport = _interopRequireDefault(require("passport"));
var _passportGoogleOauth = require("passport-google-oauth2");
var _redis = _interopRequireDefault(require("../../utils/redis"));
var _user = _interopRequireDefault(require("../../models/user"));
var options = {
  clientID: _config.default.google_client_id,
  clientSecret: _config.default.google_client_secret,
  callbackURL: _config.default.google_callback_url,
  passReqToCallback: true
};
var googleLogin = function googleLogin(passport) {
  passport.use(new _passportGoogleOauth.Strategy(options, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, accessToken, refreshToken, profile, done) {
      var user, sess, newUser;
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
              _context.next = 13;
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
              _context.next = 13;
              break;
            }
            _context.next = 11;
            return _redis.default.setAsync('currentUser', JSON.stringify(newUser));
          case 11:
            sess.user = JSON.stringify(newUser);
            return _context.abrupt("return", done(null, newUser));
          case 13:
            if (!user) {
              _context.next = 18;
              break;
            }
            _context.next = 16;
            return _redis.default.setAsync('currentUser', JSON.stringify(user));
          case 16:
            sess.user = JSON.stringify(user);
            return _context.abrupt("return", done(null, user));
          case 18:
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
exports.googleLogin = googleLogin;
_passport.default.serializeUser(function (user, done) {
  done(null, user);
});
_passport.default.deserializeUser( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(id, done) {
    var user;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user.default.findById(id);
        case 2:
          user = _context2.sent;
          done(null, user);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}());