"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("../controllers/user"));
var _auth = _interopRequireDefault(require("../middlewares/auth"));
var router = _express.default.Router();
router.post('/signup', _user.default.signup);
router.post('/signin', _user.default.signin);
router.get('/all', _user.default.getAll);
router.get('/me/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _user.default.getMe);
router.get('/:id', _user.default.getUserById);
router.patch('/update/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _user.default.updateUser);
router.patch('/update/avatar/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _user.default.updateUserAvatar);
router.delete('/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _user.default.deleteAccount);
var _default = router;
exports.default = _default;