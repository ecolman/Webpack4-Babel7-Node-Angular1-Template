/**
 * Express configuration
 */

/*eslint no-process-env:0*/

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import lusca from 'lusca';
import { config } from './config';
import passport from 'passport';
import session from 'express-session';

import Sql from './sqldb';
let Store = require('express-sequelize-session')(session.Store);

export default function(app) {
  if (config.isProd) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  } else {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', `${config.root}/server/views`);
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: new Store(Sql.sequelize)
  }));

  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if (!config.isTest) {
    app.use(lusca({
      csrf: false, // this gets turned on in route.js
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }

  if (!config.isProd) {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
