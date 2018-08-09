'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _httpStatus = require('http-status');

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _expressWinston = require('express-winston');

var _expressWinston2 = _interopRequireDefault(_expressWinston);

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _mongoose = require('../db/mongoose');

var _winston3 = require('./winston');

var _winston4 = _interopRequireDefault(_winston3);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _user = require('../modules/User/user.routes');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

if (_config2.default.env === 'development') {
  app.use((0, _morgan2.default)('dev'));
}
// parse body params and attache them to req.body
app.use(_bodyParser2.default.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use((0, _helmet2.default)());

// enable CORS - Cross Origin Resource Sharing
app.use((0, _cors2.default)());

// enable detailed API logging in dev env
if (_config2.default.env === 'development') {
  _expressWinston2.default.requestWhitelist.push('body');
  _expressWinston2.default.responseWhitelist.push('body');
  app.use(_expressWinston2.default.logger({
    winstonInstance: new _winston2.default.Logger({
      transports: [new _winston2.default.transports.Console({
        json: true,
        colorize: true,
        timestamp: true
      })]
    }),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true
  }));
}
app.use('/users', _user2.default);

// error handler
app.use(function (err, req, res, next) {
  res.status(404).json(err);
});

exports.default = app;
module.exports = exports['default'];
//# sourceMappingURL=server.js.map
