"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _winston = _interopRequireDefault(require("winston"));
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};
_winston.default.addColors(colors);
const format = _winston.default.format.combine(_winston.default.format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss:ms'
}), _winston.default.format.colorize({
  all: true
}), _winston.default.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [new _winston.default.transports.Console()];
const logger = _winston.default.createLogger({
  level: level(),
  levels,
  format,
  transports
});
var _default = logger;
exports.default = _default;