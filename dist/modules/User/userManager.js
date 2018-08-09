'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var test = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var device, storage;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log("helloooo==>>>");
                        //  console.log(req.body)
                        device = new _instagramPrivateApi.V1.Device(req.body.username);
                        storage = new _instagramPrivateApi.V1.CookieFileStorage('./storage/' + req.body.username + '.json');

                        console.log(device, storage);
                        _instagramPrivateApi.V1.Session.create(device, storage, req.body.username, req.body.password).then(function (session) {
                            // Now you have a session, we can follow / unfollow, anything...
                            // And we want to follow Instagram official profile
                            console.log("hellooo---++");
                            var feed = new _instagramPrivateApi.V1.Feed.AccountFollowers(session, req.body.id);
                            var i = 0;
                            var max = 70;
                            Promise.mapSeries(_.range(0, max), function () {
                                process.stdout.clearLine(); // clear current text
                                process.stdout.cursorTo(0); // move cursor to beginning of line

                                i = i + 1;
                                process.stdout.write("loading   " + i + '/' + max);
                                return feed.get();
                            }).then(function (results) {
                                var contacts = _.flatten(results);

                                var paramss = [];
                                var params = _.map(contacts, function (contact) {
                                    paramss.push(contact._params);
                                });

                                var content = JSON.stringify(paramss);
                                fs.writeFile("./storage/file2.json", content, 'utf8', function (err) {
                                    if (err) {
                                        return console.log(err);
                                    }

                                    console.log("The file was saved!");

                                    var Json2csvParser = require('json2csv').Parser;
                                    var fields = ['pk', 'username', 'fullName', 'isPrivate', 'profilePicUrl', 'profilePicId', 'isVerified', 'hasAnonymousProfilePicture', 'reelAutoArchive', 'reelAutoArchive', 'picture', 'id'];
                                    var opts = { fields: fields };
                                    var transformOpts = { highWaterMark: 16384, encoding: 'utf-8' };

                                    var input = fs.createReadStream('./storage/file2.json', { encoding: 'utf8' });
                                    var output = fs.createWriteStream('./storage/file.csv', { encoding: 'utf8' });
                                    var json2csv = new Json2csvTransform(opts, transformOpts);

                                    var processor = input.pipe(json2csv).pipe(output);

                                    console.log("csvvvv doneeee!!!!");
                                });
                            });
                        });

                        console.log("hereee==>");

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return function test(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

var _instagramPrivateApi = require('instagram-private-api');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash');
var fs = require('fs');
var Promise = require('bluebird');
var csvWriter = require('csv-write-stream');
var writer = csvWriter();
var json2csv = require('json2csv').parse;
var Json2csvTransform = require('json2csv').Transform;

module.exports = {
    test: test
    // getInstagramData
};
//# sourceMappingURL=userManager.js.map
