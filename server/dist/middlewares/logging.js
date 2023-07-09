"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var logger = require('../utils/logger');
var stream = {
  write: function write(message) {
    return logger.http(message);
  }
};
var skip = function skip() {
  var env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
var logging = (0, _morgan.default)(':method :url :status :res[content-length] - :response-time ms', {
  stream: stream,
  skip: skip
});
var loggingMiddleware = {
  logging: logging
};
var _default = loggingMiddleware;
exports.default = _default;