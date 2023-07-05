"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _config = _interopRequireDefault(require("./utils/config"));
var _express = _interopRequireDefault(require("express"));
var _cookieParser = _interopRequireDefault(require("cookie-parser"));
var _cors = _interopRequireDefault(require("cors"));
var _helmet = _interopRequireDefault(require("helmet"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));
var _passport = _interopRequireDefault(require("passport"));
var _mongo = _interopRequireDefault(require("./utils/mongo"));
var _logging = _interopRequireDefault(require("./middlewares/logging"));
var _error = _interopRequireDefault(require("./middlewares/error"));
var _user = _interopRequireDefault(require("./routes/user"));
var _google = _interopRequireDefault(require("./routes/google"));
var _jwt = require("./services/passport/jwt");
var _google2 = require("./services/passport/google");
var _fb = require("./services/passport/fb");
var _redis = _interopRequireDefault(require("./utils/redis"));
var _cors2 = _interopRequireDefault(require("./middlewares/cors"));
var _logger = _interopRequireDefault(require("./utils/logger"));
require('express-async-errors');
var app = (0, _express.default)();
app.use(_express.default.static('../client/build'));
app.use((0, _cookieParser.default)());
app.use((0, _expressSession.default)({
  store: _redis.default.redisStore,
  secret: [_config.default.cookie_secret1, _config.default.cookie_secret2],
  name: _config.default.cookie_name,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
    // if true only transmit cookie over https
    httpOnly: false,
    // if true prevent client side JS from reading the cookie
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none'
  }
}));
app.use(_passport.default.initialize());
app.use(_passport.default.session());
(0, _google2.googleLogin)(_passport.default);
(0, _fb.fbLogin)(_passport.default);
(0, _jwt.jwtLogin)(_passport.default);
app.use((0, _cors.default)({
  origin: _config.default.frontend_url,
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(_cors2.default.cors);
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.disable('x-powered-by');
app.use((0, _helmet.default)());
app.use(require('sanitize').middleware);
(0, _mongo.default)();
app.use((0, _expressMongoSanitize.default)());
app.use(_logging.default.logging);
app.use('/api/user', _user.default);
app.use('/api/google', _google.default);
app.use(_error.default.endPoint404);
app.use(_error.default.errorHandler);
app.listen(_config.default.port, function () {
  _logger.default.debug("Server is running on port ".concat(_config.default.port));
});