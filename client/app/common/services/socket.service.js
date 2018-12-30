import * as _ from 'lodash';
import angular from 'angular';
import io from 'socket.io-client';

function Socket(socketFactory) {
  'ngInject';
  // socket.io now auto-configures its connection when we ommit a connection url

  var ioSocket = io('', {
    // Send auth token on connection, you will need to DI the Auth service above
    // 'query': 'token=' + Auth.getToken()
    path: '/socket.io-client'
  });

  var socket = socketFactory({
    ioSocket
  });

  return {
    socket,

    /**
     * Register listeners to sync an array with updates on a model
     *
     * Takes the array we want to sync, the model name that socket updates are sent from,
     * and an optional callback function after new items are updated.
     *
     * @param {String} modelName
     * @param {Array} array
     * @param {Function} cb
     */
    syncUpdates(modelNames, array, cb) {
      cb = cb || angular.noop;

      if (_.isString(modelNames)) {
        modelNames = [modelNames];
      }

      _.each(modelNames, name => {
        /**
         * Syncs item creation/updates on 'model:save'
         */
        socket.on(`${name}:save`, item => {
          let oldItem = _.find(array, {
            id: item.id
          });
          let index = array.indexOf(oldItem);
          let event = 'created';

          // replace oldItem if it exists
          // otherwise just add item to the collection
          if (oldItem) {
            array.splice(index, 1, item);
            event = 'updated';
          } else {
            array.push(item);
          }

          cb(name, event, item, array);
        });

        /**
         * Syncs removed items on 'model:remove'
         */
        socket.on(`${name}:remove`, item => {
          let event = 'deleted';
          _.remove(array, {
            id: item.id
          });
          cb(name, event, item, array);
        });
      });
    },

    /**
     * Removes listeners for a models updates on the socket
     *
     * @param modelName
     */
    unsyncUpdates(modelNames) {
      if (_.isString(modelNames)) {
        modelNames = [modelNames];
      }

      _.each(modelNames, name => {
        socket.removeAllListeners(`${name}:save`);
        socket.removeAllListeners(`${name}:remove`);
      });
    }
  };
}

export default angular.module('webpack-angular1.services.socket', [])
  .factory('socket', Socket)
  .name;
