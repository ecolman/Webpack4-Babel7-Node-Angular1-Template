import Umzug from 'umzug';

import Sql from '../sqldb';
import Log from '../components/log';

const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: { sequelize: Sql.sequelize },

  migrations: {
    params: [
      Sql.sequelize.getQueryInterface(),
      Sql.Sequelize,
    ],
    path: `${__dirname}/../../server/sqldb/migrations`,
    pattern: /^(?!index)\.js$/
  },
});

const logUmzugEvent = eventName => name => {
  Log.info(`${eventName} :: ${name}`);
};

const printStatus = () => Promise.all([umzug.executed(), umzug.pending()])
  .then(results => Object.assign({}, {
    executed: results[0].map(m => m.file),
    pending: results[1].map(m => m.file),
  }))
  .then(status => {
    Log.info(JSON.stringify(status, null, 2));
    return status;
  });

umzug.on('migrating', logUmzugEvent('migrating'));
umzug.on('migrated', logUmzugEvent('migrated'));
umzug.on('reverting', logUmzugEvent('reverting'));
umzug.on('reverted', logUmzugEvent('reverted'));

export default () => umzug.up().then(printStatus);
