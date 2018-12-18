const assert = require('assert');
const app = require('../../src/app');

describe('\'visit-cards\' service', () => {
  it('registered the service', () => {
    const service = app.service('visit-cards');

    assert.ok(service, 'Registered the service');
  });
});
