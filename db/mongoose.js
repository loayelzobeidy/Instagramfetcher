import mongoose from 'mongoose';
import logger from '../config/winston';
import config from '../config/config';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + config.dbName, {})
    .then((success) => logger.info('Connected to mongo database: ' + config.dbName))
    .catch((error) => logger.error(error))

module.exports = {
    mongoose
};