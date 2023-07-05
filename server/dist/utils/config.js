"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv.default.config();
var PORT = process.env.PORT;
var FRONTEND_URL = process.env.FRONTEND_URL;
var MONGO_URL_DEV = process.env.MONGO_URL_DEV;
var MONGO_URL_PROD = process.env.MONGO_URL_PROD;
var MONGO_URL_TEST = process.env.MONGO_URL_TEST;
var GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
var GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
var GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
var FB_CLIENT_ID = process.env.FB_CLIENT_ID;
var FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET;
var FB_CALLBACK_URL = process.env.FB_CALLBACK_URL;
var JWT_SECRET = process.env.JWT_SECRET;
var SESSION_SECRET = process.env.SESSION_SECRET;
var COOKIE_SECRET1 = process.env.COOKIE_SECRET1;
var COOKIE_SECRET2 = process.env.COOKIE_SECRET2;
var COOKIE_NAME = process.env.COOKIE_NAME;
var REDIS_URL = process.env.REDIS_URL;
var REDIS_PORT = process.env.REDIS_PORT;
var REDIS_HOST = process.env.REDIS_HOST;
var REDIS_PASSWORD = process.env.REDIS_PASSWORD;
var SUCCESS_REDIRECT = process.env.SUCCESS_REDIRECT;
var FAILURE_REDIRECT = process.env.FAILURE_REDIRECT;
var config = {
  port: PORT,
  frontend_url: FRONTEND_URL,
  mongo_url_dev: MONGO_URL_DEV,
  mongo_url_prod: MONGO_URL_PROD,
  mongo_url_test: MONGO_URL_TEST,
  google_client_id: GOOGLE_CLIENT_ID,
  google_client_secret: GOOGLE_CLIENT_SECRET,
  google_callback_url: GOOGLE_CALLBACK_URL,
  fb_client_id: FB_CLIENT_ID,
  fb_client_secret: FB_CLIENT_SECRET,
  fb_callback_url: FB_CALLBACK_URL,
  jwt_secret: JWT_SECRET,
  session_secret: SESSION_SECRET,
  cookie_secret1: COOKIE_SECRET1,
  cookie_secret2: COOKIE_SECRET2,
  redis_url: REDIS_URL,
  redis_host: REDIS_HOST,
  redis_port: REDIS_PORT,
  redis_password: REDIS_PASSWORD,
  cookie_name: COOKIE_NAME,
  success_redirect: SUCCESS_REDIRECT,
  failure_redirect: FAILURE_REDIRECT
};
var _default = config;
exports.default = _default;