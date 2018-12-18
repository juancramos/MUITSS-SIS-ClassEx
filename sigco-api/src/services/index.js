const neighbors = require('./neighbors/neighbors.service.js');
const visitCards = require('./visit-cards/visit-cards.service.js');
const invoices = require('./invoices/invoices.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(neighbors);
  app.configure(visitCards);
  app.configure(invoices);
};
