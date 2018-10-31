/*eslint no-process-env:0*/

import path from 'path';

// COMMON server config
const common = {
  env: process.env.NODE_ENV || 'local',
  isProd: process.env.NODE_ENV !== undefined && process.env.NODE_ENV !== 'development'
    && process.env.NODE_ENV !== 'local' && process.env.NODE_ENV !== 'test',
  isTest: process.env.NODE_ENV === 'test',

  // Root path of server
  root: path.normalize(`${__dirname}/../..`),

  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0',

  seedDB: false, // populate the db
  forceDB: false, // force update of db

  // secret for session
  secrets: {
    session: 'wepack4-babel7-node-angular-template'
  }
};

// export the config object based on the environment
export const config = Object.assign({},
  common,
  require('./shared').config,
  require(`./${common.env}`).config || {});
