"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _joi = _interopRequireDefault(require("joi"));
var password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~?/`!@#$%^&*()\-_=+{};:,<.>])(?=.{8,})/;
var username_regex = /^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{3,}$/;
var signupSchema = _joi.default.object().keys({
  email: _joi.default.string().trim().required().email(),
  username: _joi.default.string().pattern(username_regex, 'Username requires 2 characters long with letters, numbers and special characters').trim().required(),
  password: _joi.default.string().pattern(password_regex, 'Password requires 8 characters with one lower, 1 uppercase letter, 1 number and 1 symbol').required(),
  confirm: _joi.default.string().valid(_joi.default.ref('password')).required().strict()
}).required();
var signinSchema = _joi.default.object().keys({
  email: _joi.default.string().trim().required().email(),
  password: _joi.default.string().trim().required()
}).required();
var validators = {
  signinSchema: signinSchema,
  signupSchema: signupSchema
};
var _default = validators;
exports.default = _default;