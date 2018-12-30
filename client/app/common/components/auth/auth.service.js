/*eslint no-sync: 0*/

import _ from 'lodash';

export class AuthService {
  constructor($location, $cookies, $q, UtilService, UserService) {
    'ngInject';

    const _User = {
      id: '',
      firstName: '',
      lastName: '',
      role: ''
    };

    this.$cookies = $cookies;
    this.$q = $q;

    this.promises = {};
    this.safeCb = UtilService.safeCb;
    this.currentUser = Object.assign({}, _User);

    if (this.$cookies.get('token') && $location.path() !== '/logout') {
      this.currentUser = UserService.get();
    }
  }

  /**
   * Gets all available info on a user
   *
   * @param  {Function} [callback] - function(user)
   * @return {Promise}
   */
  getCurrentUser(callback) {
    var value = _.get(this.currentUser, '$promise') ? this.currentUser.$promise : this.currentUser;

    return this.$q.when(value)
      .then(user => {
        this.safeCb(callback)(user);
        return user;
      }, () => {
        this.safeCb(callback)({});
        return {};
      });
  }

  /**
   * Check if a user is logged in
   *
   * @param  {Function} [callback] - function(is)
   * @return {Promise}
   */
  isLoggedIn(callback) {
    return this.getCurrentUser(undefined)
      .then(user => {
        let is = _.get(user, 'roles');

        this.safeCb(callback)(is);
        return is;
      });
  }

  /**
   * Check if a user is logged in
   *
   * @return {Bool}
   */
  isLoggedInSync() {
    return !!_.get(this.currentUser, 'roles');
  }

  /**
   * Check if a user has a specified roles or higher
   *
   * @param  {String|Array} role      - the role to check against
   * @param  {Function} [callback]    - function(has)
   * @return {Promise}
   */
  hasRole(role, callback) {
    return this.getCurrentUser(undefined)
      .then(user => {
        let has = this.hasRole(_.get(user, 'roles'), role);

        this.safeCb(callback)(has);
        return has;
      });
  }

  /**
   * Check if a user has a specified role or higher
   *
   * @param  {String|Array} role - the role to check against
   * @return {Bool}
   */
  hasRoleSync(role) {
    return this.hasRole(_.get(this.currentUser, 'roles'), role);
  }

  /**
   * Get auth token
   *
   * @return {String} - a token string used for authenticating
   */
  getToken() {
    return this.$cookies.get('token');
  }
}
