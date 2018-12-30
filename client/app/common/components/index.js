import angular from 'angular';

import Auth from './auth/auth.module';
import footer from './footer/footer.component';
import modal from './modal/modal.service';
import navbar from './navbar/navbar.component';

export default angular.module('webpack-angular1.components', [
    Auth, footer, modal, navbar
  ])
  .name;
