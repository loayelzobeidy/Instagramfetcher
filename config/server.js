import express from 'express';
import logger from 'morgan';
import cors from 'cors'
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import helmet from 'helmet';
import winston from 'winston';
import { mongoose } from '../db/mongoose';
import winstonInstance from './winston';
import config from './config';
import expressJwt from 'express-jwt';
import userRoutes from '../modules/User/user.routes';


const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}
// parse body params and attache them to req.body
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance : new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true,
          timestamp: true
        })
      ]
    }),
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true
  }));
}
app.use('/users', userRoutes);

// error handler
app.use((err, req, res, next) => {
  res.status(404).json(err);
});

export default app;
