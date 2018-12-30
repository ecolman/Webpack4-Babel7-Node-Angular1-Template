import angular from 'angular';

export class NavbarComponent {
  constructor(AuthService) {
    'ngInject';

    this.AuthService = AuthService;

    this.isLoggedIn = AuthService.isLoggedInSync;
    this.isAdmin = AuthService.isAdminSync;
    this.getCurrentUser = AuthService.getCurrentUserSync;

    this.menu = [{
      title: 'Home',
      state: 'main'
    }];
  
    this.isCollapsed = true;
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
