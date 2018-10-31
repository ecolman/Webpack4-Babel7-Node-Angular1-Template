/*eslint no-process-env:0*/
/*eslint no-unused-vars:0*/

import '@babel/polyfill';
import express from 'express';
import { config } from './config';
import http from 'http';
import syncDatabase from './sqldb/umzug';
import SocketIo from 'socket.io';

// setup express and set env variables
const app = express();

// set app wide vars
app.set('env', config.env);
app.set('isProd', config.isProd);
app.set('isTest', config.isTest);

// base http server
const server = http.createServer(app);

// socket.io
const socketio = SocketIo(server, {
  serveClient: !config.isProd,
  path: '/socket.io-client'
});
require('./components/socketio').default(socketio);

require('./express').default(app); //express
require('./components/fileUpload'); // additional components
require('./routes').default(app); // routes

// run migrations, then start server
if (config.isProd) {
  syncDatabase()
    .catch(err => console.log(`${err.name}: ${err.message}`))
    .finally(() => startServer());
} else {
  startServer();
}

// start server method
function startServer() {
  app.verizonPnbPpm = server.listen(config.port, config.ip, function() {
    console.log(`Express server listening on ${config.port} | env = ${config.env} | mode = ${config.isProd ? 'production' : 'development'}`);
  });
}

// Expose app
export default app;
