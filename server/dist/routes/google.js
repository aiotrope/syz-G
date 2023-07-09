"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config"));
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _google = _interopRequireDefault(require("../controllers/google"));
var _auth = _interopRequireDefault(require("../middlewares/auth"));
var router = _express.default.Router();
router.get('/', _passport.default.authenticate('google', {
  scope: ['profile', 'email'],
  session: false
}));
router.get('/callback', _passport.default.authenticate('google', {
  successRedirect: _config.default.success_redirect,
  failureRedirect: _config.default.failure_redirect,
  session: false
}));
router.get('/user', _auth.default.checkAuth, _google.default.getGoogleUserAccessToken);
var _default = router;
exports.default = _default;