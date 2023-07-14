"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
var password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~?/`!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/;
var username_regex = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{4,}$/;
var signupSchema = _joi.default.object().keys({
  email: _joi.default.string().trim().required().email(),
  username: _joi.default.string().pattern(username_regex, 'Username requires 4 characters long with letters, numbers and special characters').trim().required(),
  password: _joi.default.string().pattern(password_regex, 'Password requires 8 characters with one lower, 1 uppercase letter, 1 number and 1 symbol').required(),
  confirm: _joi.default.string().valid(_joi.default.ref('password')).required().strict()
}).required();
var signinSchema = _joi.default.object().keys({
  email: _joi.default.string().trim().required().email(),
  password: _joi.default.string().trim().required()
}).required();
var updateUserSchema = _joi.default.object().keys({
  email: _joi.default.string().trim().email().optional(),
  username: _joi.default.string().pattern(username_regex, 'Username requires 4 characters long with letters, numbers and special characters').trim().optional(),
  bio: _joi.default.string().optional()
}).optional();
var createPostSchema = _joi.default.object().keys({
  title: _joi.default.string().min(5).required(),
  description: _joi.default.string().min(10).required(),
  tag: _joi.default.array().items(_joi.default.string()),
  entry: _joi.default.string().min(10).required()
}).required();
var updatePostSchema = _joi.default.object().keys({
  title: _joi.default.string().min(5).optional(),
  description: _joi.default.string().min(10).optional(),
  tag: _joi.default.string().trim().min(1).optional(),
  entry: _joi.default.string().min(10).optional()
});
var validators = {
  signinSchema: signinSchema,
  signupSchema: signupSchema,
  updateUserSchema: updateUserSchema,
  createPostSchema: createPostSchema,
  updatePostSchema: updatePostSchema
};
var _default = validators;
exports.default = _default;