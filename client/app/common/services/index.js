import angular from 'angular';
import { map } from 'lodash';

import * as services from './*.service.js';

export default angular.module('webpack-angular1.services', map(services, s => s))
  .name;
