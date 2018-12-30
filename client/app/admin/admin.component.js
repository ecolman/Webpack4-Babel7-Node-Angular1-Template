import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import routes from './admin.routes';

export class AdminComponent {
  constructor(EntityService) {
    'ngInject';

    this.EntityService = EntityService;

    this.users = this.EntityService.list(this.EntityService.entityTypes.users);
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

export default angular.module('webpack-angular1.admin', [uiRouter])
  .config(routes)
  .component('admin', {
    bindings: {
      currentUser: '<'
    },
    template: require('./admin.html'),
    controller: AdminComponent
  })
  .name;
