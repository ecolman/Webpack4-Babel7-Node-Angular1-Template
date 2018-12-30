import angular from 'angular';
import { config } from '../config';

export default angular.module('webpack-angular1.constants', [])
  .constant('appConfig', config)
  .name;
