export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      authenticate: 'user',
      component: 'home',
      url: '/home',
      data: {
        title: 'Home'
      },
      resolve: {
        currentUser: AuthService => AuthService.getCurrentUser(undefined)
      }
    });
}
