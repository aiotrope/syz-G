"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(require("./config"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));
var _helmet = _interopRequireDefault(require("helmet"));
var _nocache = _interopRequireDefault(require("nocache"));
var _mongo = _interopRequireDefault(require("./utils/mongo"));
var _logging = _interopRequireDefault(require("./middlewares/logging"));
var _error = _interopRequireDefault(require("./middlewares/error"));
var _cors2 = _interopRequireDefault(require("./middlewares/cors"));
var _user = _interopRequireDefault(require("./routes/user"));
var _index = _interopRequireDefault(require("./routes/index"));
var _post = _interopRequireDefault(require("./routes/post"));
var _comment = _interopRequireDefault(require("./routes/comment"));
var _testing = _interopRequireDefault(require("./routes/testing"));
require('express-async-errors');
const app = (0, _express.default)();
(0, _mongo.default)();
app.use((0, _cookieParser.default)());
app.use((0, _cors.default)({
  origin: [_config.default.frontend_url, _config.default.original_frontend_url, _config.default.backend_url, _config.default.local_url],
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(_cors2.default.cors);
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.disable('x-powered-by');
app.use((0, _expressMongoSanitize.default)());
app.use((0, _helmet.default)());
app.use(_logging.default.logging);
app.use((0, _nocache.default)());
app.use('/', _index.default);
app.use('/api/user', _user.default);
app.use('/api/post', _post.default);
app.use('/api/comment', _comment.default);
if (process.env.NODE_ENV === 'test') {
  app.use('/api/testing', _testing.default);
}
app.use(_error.default.endPoint404);
app.use(_error.default.errorHandler);
var _default = app;
exports.default = _default;