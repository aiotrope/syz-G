"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _user = _interopRequireDefault(require("../controllers/user"));
var _auth = _interopRequireDefault(require("../middlewares/auth"));
var router = _express.default.Router();
router.post('/signup', _user.default.signup);
router.post('/signin', _user.default.signin);
router.get('/', _user.default.getAll);
router.get('/:id', _passport.default.authenticate('jwt', {
  session: false
}), _user.default.getJwtUserById);
router.delete('/signout/:id', _auth.default.checkAuth, _user.default.signout);
var _default = router;
exports.default = _default;