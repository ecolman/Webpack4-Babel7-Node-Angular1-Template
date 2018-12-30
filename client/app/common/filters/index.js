import angular from 'angular';

import PluckFilter from './pluck/pluck.filter';

export default angular.module('webpack-angular1.filters', [
    PluckFilter
  ])
  .name;
