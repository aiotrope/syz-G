"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _comment = _interopRequireDefault(require("../controllers/comment"));
var _auth = _interopRequireDefault(require("../middlewares/auth"));
var router = _express.default.Router();
router.post('/:postId', _auth.default.tokenExtractor, _auth.default.userExtractor, _comment.default.createComment);
router.get('/:id', _comment.default.getCommentById);
router.delete('/delete/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _comment.default.deleteComment);
router.patch('/update/:id', _auth.default.tokenExtractor, _auth.default.userExtractor, _comment.default.updateComment);
var _default = router;
exports.default = _default;