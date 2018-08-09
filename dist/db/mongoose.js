'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _winston = require('../config/winston');

var _winston2 = _interopRequireDefault(_winston);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;
_mongoose2.default.connect('mongodb://localhost/' + _config2.default.dbName, {}).then(function (success) {
    return _winston2.default.info('Connected to mongo database: ' + _config2.default.dbName);
}).catch(function (error) {
    return _winston2.default.error(error);
});

module.exports = {
    mongoose: _mongoose2.default
};
//# sourceMappingURL=mongoose.js.map
