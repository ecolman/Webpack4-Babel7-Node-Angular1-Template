import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import routes from './home.routes';

export class HomeComponent {
  constructor() {
    'ngInject';

  }
}

export default angular.module('webpack-angular1.home', [uiRouter])
  .config(routes)
  .component('home', {
    bindings: {
      currentUser: '<'
    },
    template: require('./home.html'),
    controller: HomeComponent
  })
  .name;
