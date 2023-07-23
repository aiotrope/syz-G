"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("../config"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./logger"));
let dbURL;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
const dbConnection = () => {
  _mongoose.default.set('strictQuery', false);
  if (process.env.NODE_ENV === 'test') {
    dbURL = _config.default.mongo_url_test;
  }
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    dbURL = _config.default.mongo_url;
  }
  _mongoose.default.connect(dbURL, opts);
  const db = _mongoose.default.connection;
  db.once('open', () => {
    _logger.default.http(`Database connected: ${dbURL}`);
  });
  db.on('error', error => {
    _logger.default.error(`connection error: ${error}`);
  });
};
var _default = dbConnection;
exports.default = _default;