'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _util = require('util');

var _util2 = _interopRequireDefault(_util);

var _winston = require('./config/winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _server = require('./config/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// config should be imported before importing any other file
var debug = require('debug')('Comoinsta:index');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

if (!module.parent) {
  // listen on port config.port  
  _server2.default.listen(_config2.default.port, function () {
    _winston2.default.info('server started on port ' + _config2.default.port + ' (' + _config2.default.env + ')'); // eslint-disable-line no-console
  });
}

exports.default = _server2.default;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map
