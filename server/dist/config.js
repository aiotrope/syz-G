"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
_dotenv.default.config({
  path: _path.default.resolve(__dirname, '../../.env')
});
var PORT = process.env.PORT;
var FRONTEND_URL = process.env.FRONTEND_URL;
var BACKEND_URL = process.env.BACKEND_URL;
var MONGO_URL = process.env.MONGO_URL;
var MONGO_URL_TEST = process.env.MONGO_URL_TEST;
var JWT_SECRET = process.env.JWT_SECRET;
var SESSION_SECRET = process.env.SESSION_SECRET;
var COOKIE_SECRET1 = process.env.COOKIE_SECRET1;
var COOKIE_SECRET2 = process.env.COOKIE_SECRET2;
var COOKIE_NAME = process.env.COOKIE_NAME;
var REDIS_URL = process.env.REDIS_URL;
var REDIS_PORT = process.env.REDIS_PORT;
var REDIS_HOST = process.env.REDIS_HOST;
var REDIS_PASSWORD = process.env.REDIS_PASSWORD;
var CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
var CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
var CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
var config = {
  port: PORT,
  frontend_url: FRONTEND_URL,
  backend_url: BACKEND_URL,
  mongo_url: MONGO_URL,
  mongo_url_test: MONGO_URL_TEST,
  jwt_secret: JWT_SECRET,
  session_secret: SESSION_SECRET,
  cookie_secret1: COOKIE_SECRET1,
  cookie_secret2: COOKIE_SECRET2,
  redis_url: REDIS_URL,
  redis_host: REDIS_HOST,
  redis_port: REDIS_PORT,
  redis_password: REDIS_PASSWORD,
  cookie_name: COOKIE_NAME,
  cloudinary_name: CLOUDINARY_NAME,
  cloudinary_key: CLOUDINARY_KEY,
  cloudinary_secret: CLOUDINARY_SECRET
};
module.exports = config;