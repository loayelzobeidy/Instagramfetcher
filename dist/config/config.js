'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

var envVars = process.env;

var config = {
  env: envVars.NODE_ENV,
  jwtSecret: envVars.JWT_SECRET,
  port: envVars.PORT,
  dbName: envVars.DB_NAME,
  admin: envVars.ADMIN
};

exports.default = config;
module.exports = exports['default'];
//# sourceMappingURL=config.js.map
