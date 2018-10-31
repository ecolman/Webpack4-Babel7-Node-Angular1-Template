import { config } from '../config';
import Sequelize from 'sequelize';
import * as Models from './**/*.model.js';
import { forEach, mapValues } from 'lodash';

var sequelize;

if (config.sequelize.uri) {
  sequelize = new Sequelize(config.sequelize.uri, config.sequelize.options);
} else {
  sequelize = new Sequelize(config.sequelize.database, config.sequelize.username, config.sequelize.password, config.sequelize.options);
}

var db = {
  Sequelize,
  sequelize
};

// loop through models and attach to sequelize
forEach(Models, method => {
  let model = method(sequelize, Sequelize.DataTypes);

  if (model) {
    db[model.name] = model;
  }
});

// run the associations defined in each model's classMethods
// needs to be run after models are initalized
Object.keys(db).forEach(modelName => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
  if ('hooks' in db[modelName]) {
    forEach(db[modelName].hooks, (fn, hook) => {
      db[modelName].hook(hook, (entity, options) => {
        fn(entity, options, db);
      });
    });
  }
});

export default mapValues(db, m => m);
