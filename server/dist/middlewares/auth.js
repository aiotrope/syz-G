"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config"));
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _user = _interopRequireDefault(require("../models/user"));
const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7);
  } else {
    next((0, _httpErrors.default)(401));
  }
  next();
};
const userExtractor = async (req, res, next) => {
  const token = req.token;
  const decoded = _jsonwebtoken.default.verify(token, _config.default.jwt_secret);
  const currentUser = await _user.default.findById(decoded.id);
  if (!decoded) {
    next((0, _httpErrors.default)(401));
  }
  req.user = currentUser;
  next();
};
const authMiddleware = {
  tokenExtractor,
  userExtractor
};
var _default = authMiddleware;
exports.default = _default;