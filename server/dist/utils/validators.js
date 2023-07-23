"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _safeRegex = _interopRequireDefault(require("safe-regex"));
var _logger = _interopRequireDefault(require("./logger"));
const password_regex = /^(?=.*[0-9])(?=.*[!@#%^&*+-])[a-zA-Z0-9!@#%^&*+-=]{8,30}$/;
const username_regex = /^[a-zA-Z0-9!@#%^&*+-=]{4,}$/;
let signupSchema;
let updateUserSchema;
if ((0, _safeRegex.default)(username_regex) && (0, _safeRegex.default)(password_regex)) {
  signupSchema = _joi.default.object().keys({
    email: _joi.default.string().trim().required().email(),
    username: _joi.default.string().pattern(new RegExp(username_regex), 'Username requires 4 characters long with letters, numbers and special characters').trim().required(),
    password: _joi.default.string().pattern(new RegExp(password_regex), 'Password requires 8 characters with one lower, 1 uppercase letter, 1 number and 1 symbol').required(),
    confirm: _joi.default.string().valid(_joi.default.ref('password')).required().strict()
  }).required();
  updateUserSchema = _joi.default.object().keys({
    email: _joi.default.string().trim().email().optional(),
    username: _joi.default.string().pattern(new RegExp(username_regex), 'Username requires 4 characters long with letters, numbers and special characters').trim().optional(),
    bio: _joi.default.string().optional()
  }).optional();
} else {
  _logger.default.error('Regex patterns unsafe!');
}
const signinSchema = _joi.default.object().keys({
  email: _joi.default.string().trim().required().email(),
  password: _joi.default.string().trim().required()
}).required();
const createPostSchema = _joi.default.object().keys({
  title: _joi.default.string().min(5).required(),
  description: _joi.default.string().min(10).required(),
  tag: _joi.default.array().items(_joi.default.string().min(1).required()).required(),
  entry: _joi.default.string().min(10).required()
}).required();
const updatePostSchema = _joi.default.object().keys({
  title: _joi.default.string().min(5).optional(),
  description: _joi.default.string().min(10).optional(),
  entry: _joi.default.string().min(10).optional()
});
const createCommentSchema = _joi.default.object().keys({
  commentary: _joi.default.string().min(4).required()
}).required();
const updateCommentSchema = _joi.default.object().keys({
  commentary: _joi.default.string().min(4).optional()
});
const validators = {
  signinSchema,
  signupSchema,
  updateUserSchema,
  createPostSchema,
  updatePostSchema,
  createCommentSchema,
  updateCommentSchema
};
var _default = validators;
exports.default = _default;