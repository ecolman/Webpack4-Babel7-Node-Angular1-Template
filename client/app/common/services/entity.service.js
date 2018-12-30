import angular from 'angular';

export function Resource($resource) {
  'ngInject';

  return $resource('/api/:entity/:id');
}

export class Service {
  constructor(EntityResource) {
    'ngInject';

    this.EntityResource = EntityResource;

    this.entityTypes = {
      users: 'users'
    }
  }

  async get(id) {
    return await this.EntityResource.get({
      entity,
      id
    }).$promise;
  }

  async list(entity) {
    return await this.EntityResource.query({
      entity
    }).$promise;
  }
}

export default angular.module('webpack-angular1.services.entity', [])
  .factory('EntityResource', Resource)
  .service('EntityService', Service)
  .name;
