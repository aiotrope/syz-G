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
router.get('/', _user.default.getAll);
router.patch('/avatar', _auth.default.tokenExtractor, _auth.default.userExtractor, _user.default.createAvatar);
router.get('/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _user.default.getUserById);
router.get('/avatar/:id', _user.default.getUserAvatar);
var _default = router;
exports.default = _default;