import angular from 'angular';

import uiRouter from '@uirouter/angularjs';
import ngCookies from 'angular-cookies';

import Util from '../../services/util.service';

import { authInterceptor } from './interceptor.service';
import { routerDecorator } from './router.decorator';
import { AuthService } from './auth.service';
import { UserResource } from './user.service';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('webpack-angular1.auth', [ngCookies, Util, uiRouter])
  .factory('authInterceptor', authInterceptor)
  .run(routerDecorator)
  .service('AuthService', AuthService)
  .factory('UserResource', UserResource)
  .config(['$httpProvider', addInterceptor])
  .name;
