"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _morgan = _interopRequireDefault(require("morgan"));
var _logger = _interopRequireDefault(require("../utils/logger"));
const stream = {
  write: message => _logger.default.http(message)
};
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};
const logging = (0, _morgan.default)(':method :url :status :res[content-length] - :response-time ms', {
  stream,
  skip
});
const loggingMiddleware = {
  logging
};
var _default = loggingMiddleware;
exports.default = _default;