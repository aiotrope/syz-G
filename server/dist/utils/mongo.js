"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("./config"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./logger"));
var dbURL;
var opts = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
var dbConnection = function dbConnection() {
  _mongoose.default.set('strictQuery', false);
  if (process.env.NODE_ENV === 'development') {
    dbURL = _config.default.mongo_url_dev;
  }
  if (process.env.NODE_ENV === 'production') {
    dbURL = _config.default.mongo_url_prod;
  }
  if (process.env.NODE_ENV === 'test') {
    dbURL = _config.default.mongo_url_test;
  }
  _mongoose.default.connect(dbURL, opts);
  var db = _mongoose.default.connection;
  db.once('open', function () {
    _logger.default.http("Database connected: ".concat(dbURL));
  });
  db.on('error', function (error) {
    _logger.default.error("connection error: ".concat(error));
  });
};
var _default = dbConnection;
exports.default = _default;