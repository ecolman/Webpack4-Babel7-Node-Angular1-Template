export default function routes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('admin', {
      authenticate: 'admin',
      component: 'admin',
      url: '/admin',
      data: {
        title: 'Admin'
      },
      resolve: {
        currentUser: AuthService => AuthService.getCurrentUser(undefined)
      }
    });
}
