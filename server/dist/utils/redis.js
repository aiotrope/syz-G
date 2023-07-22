"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config"));
var _ioredis = _interopRequireDefault(require("ioredis"));
var _util = require("util");
var _logger = _interopRequireDefault(require("./logger"));
let getAsync;
let setAsync;
let redisClient;
if (!_config.default.redis_url) {
  const redisIsDisabled = () => {
    _logger.default.error('No Redis URL set, Redis is disabled');
    return null;
  };
  getAsync = redisIsDisabled;
  setAsync = redisIsDisabled;
} else {
  redisClient = new _ioredis.default(_config.default.redis_url);
  getAsync = (0, _util.promisify)(redisClient.get).bind(redisClient);
  setAsync = (0, _util.promisify)(redisClient.set).bind(redisClient);
}
const cache = {
  redisClient,
  getAsync,
  setAsync
};
var _default = cache;
exports.default = _default;