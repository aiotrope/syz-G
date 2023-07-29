"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _path = _interopRequireDefault(require("path"));
_dotenv.default.config({
  path: _path.default.resolve(__dirname, '../../.env')
});

// loading env variables and config

const PORT = process.env.PORT || 8080;
const FRONTEND_URL = process.env.FRONTEND_URL;
const ORIGINAL_FRONTEND_URL = process.env.ORIGINAL_FRONTEND_URL;
const BACKEND_URL = process.env.BACKEND_URL;
const MONGO_URL = process.env.MONGO_URL;
const MONGO_URL_TEST = process.env.MONGO_URL_TEST;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET;
const LOCAL_URL = process.env.LOCAL_URL;
const config = {
  port: PORT,
  frontend_url: FRONTEND_URL,
  original_frontend_url: ORIGINAL_FRONTEND_URL,
  backend_url: BACKEND_URL,
  mongo_url: MONGO_URL,
  mongo_url_test: MONGO_URL_TEST,
  jwt_secret: JWT_SECRET,
  cloudinary_name: CLOUDINARY_NAME,
  cloudinary_key: CLOUDINARY_KEY,
  cloudinary_secret: CLOUDINARY_SECRET,
  local_url: LOCAL_URL
};
module.exports = config;