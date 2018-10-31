/* eslint no-eq-null: 0 */

import { extend, forEach } from 'lodash';

export default {
  respondWithResult(res, statusCode = 200) {
    return entity => {
      if (entity) {
        res.status(statusCode).json(entity);
      }

      return null;
    };
  },

  handleEntityNotFound(res) {
    return entity => {
      if (!entity) {
        res.status(404).end();
        return null;
      }
      return entity;
    };
  },

  respondIfResult(res, statusCode = 200) {
    return entity => {
      if (entity) {
        res.status(statusCode).json(entity);
        return entity;
      } else {
        res.status(404).end();
        return null;
      }
    };
  },

  removeEntity(res) {
    return entity => {
      if (entity) {
        return entity.destroy()
          .then(() => {
            res.status(204).end();
          });
      }
    };
  },

  handleError(res, statusCode = 500) {
    return err => {
      console.log(err);
      res.status(statusCode).json({ message: `${err}` });
      return err;
    };
  },

  // gets a list of Models
  async list(req, res, Model, options = {}, includes = []) {
    if (Model && 'findAll' in Model) {
      if (includes.length) {
        options.include = includes;
      }

      try {
        let model = await Model.findAll(options);
        return this.respondWithResult(res)(model);
      } catch(error) {
        return this.handleError(res)(error);
      }
    } else {
      return this.handleError(res)('Model not found');
    }
  },

  // gets a single Model
  async get(req, res, Model, options = { where: { id: req.params.id } }, includes = []) {
    if (Model && 'find' in Model) {
      if (includes.length) {
        options.include = includes;
      }

      try {
        let model = await Model.find(options);

        return this.respondIfResult(res)(model);
      } catch(error) {
        return this.handleError(res)(error);
      }
    } else {
      return this.handleError(res)('Model not found');
    }
  },

  // create a single Model
  async create(req, res, Model, options = {}, postCreateFn) {
    if (Model && 'create' in Model) {
      req.body.changedBy = req.user.id;
      req.body.changedOn = new Date();

      try {
        let model = await Model.create(req.body, options);

        if (postCreateFn) {
          postCreateFn(model);
        }

        return this.respondWithResult(res, 201)(model);
      } catch(error) {
        return this.handleError(res)(error);
      }
    } else {
      return this.handleError(res)('Model not found');
    }
  },

  // create n number of Models
  async bulkCreate(req, res, Model, options = {}) {
    if (Model && 'bulkCreate' in Model) {
      forEach(req.body, obj => {
        obj.changedBy = req.user.id;
        obj.changedOn = new Date();
      });

      try {
        return Model.bulkCreate(req.body, res, options);
      } catch(error) {
        return this.handleError(res)(error);
      }
    } else {
      return this.handleError(res)('Model not found');
    }
  },

  // create or update a single Model
  async upsert(req, res, Model, options, postUpdateFn) {
    options = extend({ where: { id: req.params.id } }, options);
    if (Model && 'upsert' in Model) {
      try {
        let model = await Model.upsert(req.body, options);

        if (postUpdateFn) {
          postUpdateFn(model);
        }

        return this.respondWithResult(res)(model);
      } catch(error) {
        return this.handleError(res)(error);
      }
    } else {
      return this.handleError(res)('Model not found');
    }
  },

  // updates a single Model
  async patch(req, res, Model, options = { }) {
    if (Model && 'find' in Model && 'update' in Model) {
      try {
        let model = await Model.find({ where: { id: req.params.id } });
        await model.update(req.body, options);

        return this.respondWithResult(res)(model);
      } catch(error) {
        return this.handleError(res)(error);
      }
    } else {
      return this.handleError(res)('Model not found');
    }
  },

  // deletes a single Model
  async destroy(req, res, Model, options = { where: { id: req.params.id } }) {
    if (Model && 'find' in Model) {
      try {
        let model = await Model.find(options);

        return this.removeEntity(res)(model);
      } catch(error) {
        return this.handleError(res)(error);
      }
    } else {
      return this.handleError(res)('Model not found');
    }
  }
};
