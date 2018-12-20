const neighbors = require('./neighbors/neighbors.service.js');
const visitCards = require('./visit-cards/visit-cards.service.js');
const invoices = require('./invoices/invoices.service.js');
const teachers = require('./teachers/teachers.service.js');
const courses = require('./courses/courses.service.js');
const subjects = require('./subjects/subjects.service.js');
const inscriptions = require('./inscriptions/inscriptions.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(neighbors);
  app.configure(visitCards);
  app.configure(invoices);
  app.configure(teachers);
  app.configure(courses);
  app.configure(subjects);
  app.configure(inscriptions);
};
