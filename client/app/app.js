/*eslint no-undef:0*/
/*eslint no-unused-vars:0*/

import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';

import 'angular-socket-io';

import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';

import { routeConfig } from './app.config';

import CommonComponents from './common/components';
import CommonFilters from './common/filters';
import CommonServices from './common/services';

import HomeComponent from './home/home.component';
import AdminComponent from './admin/admin.component';

import constants from './app.constants';

angular.module('webpack-angular1', [
  ngCookies, ngResource, 
  'btford.socket-io',
  uiRouter, uiBootstrap,
  constants,

  CommonComponents, CommonFilters, CommonServices,

  HomeComponent,
  AdminComponent
])
  .config(routeConfig)

  // route transitions
  .run(function($rootScope, $state, $transitions, $anchorScroll) {
    'ngInject';

    $rootScope.isStateActive = state => $state.is(state);
    $rootScope.includedStateActive = state => $state.includes(state);
    $rootScope.firstState = true;

    $transitions.onSuccess({}, transition => {
      const from = transition.$from();
      const to = transition.$to();

      $rootScope.currentState = $state.current;

      // scroll to the top of new angular route component
      if (from.component != to.component) {
        $anchorScroll();
      }

      // helper method
      $state.goToPrevious = (reload = false) => {
        if (from && from.name) {
          $state.go(from.name, transition.params('from'), { reload });
        }
      };
    });
  })

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['webpack-angular1'], {
      strictDi: true
    });
  });
