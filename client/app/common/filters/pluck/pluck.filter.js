import angular from 'angular';
import { chain } from 'lodash';

export function pluckFilter() {
  'ngInject';

  return function(input, options) {
    return chain(input)
      .sortBy(options.property)
      .map(options.property)
      .flatten()
      .value()
      .join(options.join);
  };
}

export default angular.module('verizon-pnb.ppm.filters.pluck', [])
  .filter('pluck', pluckFilter)
  .name;
