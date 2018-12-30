export function authInterceptor($q, $cookies, $rootScope, UtilService) {
  'ngInject';

  return {
    // Add authorization token to headers
    request(config) {
      config.headers = config.headers || {};
      if ($cookies.get('token') && UtilService.isSameOrigin(config.url)) {
        config.headers.Authorization = `Bearer ${$cookies.get('token')}`;
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError(response) {
      if (response.status === 401) {
        // remove any stale tokens
        $cookies.remove('token');
      }

      if (response.status === 403 && response.config.url.indexOf('/api/admin') > -1) {
        $rootScope.$broadcast('403Error', { data: response.data, url: response.config.url });
      }

      return $q.reject(response);
    }
  };
}
