"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpErrors = _interopRequireDefault(require("http-errors"));
var _logger = _interopRequireDefault(require("../utils/logger"));
var endPoint404 = function endPoint404(req, res, next) {
  next((0, _httpErrors.default)(404));
};
var errorHandler = function errorHandler(error, req, res, next) {
  _logger.default.error(error.message);
  if (error.name === 'CastError') {
    return res.status(400).json({
      error: "".concat(error.name, ": ").concat(error.message)
    });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      error: error.message
    });
  }
  if (error.name === 'MongoServerError') {
    return res.status(500).json({
      error: error.message
    });
  }
  if (error.name === 'TypeError') {
    return res.status(400).json({
      error: error.message
    });
  }
  if (error.name === 'JsonWebTokenError' || error.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Token is incorrect or missing!'
    });
  }
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'token expired!'
    });
  }
  if (error.message === 'Cannot use the email provided') {
    return res.status(403).json({
      error: error.message
    });
  }
  if (error.message === 'Problem fetching users') {
    return res.status(422).json({
      error: error.message
    });
  }
  if (error.message === 'Incorrect login credentials') {
    return res.status(401).json({
      error: error.message
    });
  }
  if (error.message === 'No permissions to delete user session') {
    return res.status(403).json({
      error: error.message
    });
  }
  next(error);
};
var errorMiddleware = {
  endPoint404: endPoint404,
  errorHandler: errorHandler
};
var _default = errorMiddleware;
exports.default = _default;