/*eslint no-useless-escape:0*/

export function routeConfig($urlRouterProvider, $locationProvider, $uibTooltipProvider) {
  'ngInject';

  $urlRouterProvider.otherwise('/home');

  $locationProvider.html5Mode(true);

  $uibTooltipProvider.options({
    appendToBody: true
  });
}
