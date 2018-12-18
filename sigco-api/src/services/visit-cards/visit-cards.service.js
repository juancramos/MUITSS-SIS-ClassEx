// Initializes the `visit-cards` service on path `/visit-cards`
const createService = require('feathers-sequelize');
const createModel = require('../../models/visit-cards.model');
const hooks = require('./visit-cards.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/visit-cards', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('visit-cards');

  service.hooks(hooks);
};
