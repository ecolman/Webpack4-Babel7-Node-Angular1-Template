import { forEach } from 'lodash';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    roles: {
      method: 'GET',
      params: {
        id: 'roles'
      },
      isArray: true
    }
  });
}
