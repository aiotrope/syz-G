"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
var _http = _interopRequireDefault(require("http"));
var _config = _interopRequireDefault(require("./config"));
var _logger = _interopRequireDefault(require("./utils/logger"));
const server = _http.default.createServer(_app.default);
const port = _config.default.port;
server.listen(port, () => {
  _logger.default.info(`Server is running on port ${port}`);
});