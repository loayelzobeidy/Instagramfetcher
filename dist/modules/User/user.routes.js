'use strict';

var _userManager = require('./userManager');

var _userManager2 = _interopRequireDefault(_userManager);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var validate = require('express-validation');
// import config from '../../../config/config'

var router = express.Router(); // eslint-disable-line new-cap

router.get('/test', function (req, res) {
    res.json({ message: "OK" });
});
router.post('/test2', _userManager2.default.test);
module.exports = router;
//# sourceMappingURL=user.routes.js.map
