"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = _interopRequireDefault(require("../models/user"));
//import Blog = require('../models/blog')

const router = _express.default.Router();
router.post('/reset', async (req, res) => {
  //await Post.deleteMany({})
  await _user.default.deleteMany({});
  res.status(204).end();
});
var _default = router;
exports.default = _default;