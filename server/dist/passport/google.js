"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.googleLogin = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _config = _interopRequireDefault(require("../config"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _passportGoogleOauth = require("passport-google-oauth2");
var _redis = _interopRequireDefault(require("../utils/redis"));
var _user = _interopRequireDefault(require("../models/user"));
var options = {
  clientID: _config.default.google_client_id,
  clientSecret: _config.default.google_client_secret,
  callbackURL: _config.default.google_callback_url,
  passReqToCallback: true
};
var googleLogin = function googleLogin(passport) {
  passport.use(new _passportGoogleOauth.Strategy(options, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, accessToken, refreshToken, profile, done) {
      var user, newUser, payload, token, _payload, _token;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user.default.findOne({
              googleId: profile.id
            });
          case 2:
            user = _context.sent;
            if (user) {
              _context.next = 13;
              break;
            }
            _context.next = 6;
            return _user.default.create({
              email: profile.email,
              username: profile.displayName,
              googleId: profile.id
            });
          case 6:
            newUser = _context.sent;
            if (!newUser) {
              _context.next = 13;
              break;
            }
            payload = {
              id: newUser.id,
              email: newUser.email,
              username: newUser.username
            };
            token = _jsonwebtoken.default.sign(payload, _config.default.jwt_secret, {
              expiresIn: '2h'
            });
            _context.next = 12;
            return _redis.default.setAsync('access', JSON.stringify(token));
          case 12:
            return _context.abrupt("return", done(null, newUser));
          case 13:
            if (!user) {
              _context.next = 19;
              break;
            }
            _payload = {
              id: user.id,
              email: user.email,
              username: user.username
            };
            _token = _jsonwebtoken.default.sign(_payload, _config.default.jwt_secret, {
              expiresIn: '2h'
            });
            _context.next = 18;
            return _redis.default.setAsync('access', JSON.stringify(_token));
          case 18:
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
exports.googleLogin = googleLogin;