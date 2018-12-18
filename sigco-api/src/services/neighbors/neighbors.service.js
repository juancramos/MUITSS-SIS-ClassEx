// Initializes the `neighbors` service on path `/neighbors`
const createService = require('feathers-sequelize');
const createModel = require('../../models/neighbors.model');
const hooks = require('./neighbors.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/neighbors', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('neighbors');

  service.hooks(hooks);
};
