// Initializes the `inscriptions` service on path `/inscriptions`
const createService = require('feathers-sequelize');
const createModel = require('../../models/inscriptions.model');
const hooks = require('./inscriptions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/inscriptions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('inscriptions');

  service.hooks(hooks);
};
