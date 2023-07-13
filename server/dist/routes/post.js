"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _post = _interopRequireDefault(require("../controllers/post"));
var _auth = _interopRequireDefault(require("../middlewares/auth"));
var router = _express.default.Router();
router.post('/', _auth.default.tokenExtractor, _auth.default.userExtractor, _post.default.createPost);
router.get('/:id', _post.default.getPostById);
router.get('/', _post.default.getPosts);
router.delete('/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _post.default.deletePost);
router.patch('/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _post.default.updatePost);
var _default = router;
exports.default = _default;