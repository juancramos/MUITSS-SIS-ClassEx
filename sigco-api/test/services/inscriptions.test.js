const assert = require('assert');
const app = require('../../src/app');

describe('\'inscriptions\' service', () => {
  it('registered the service', () => {
    const service = app.service('inscriptions');

    assert.ok(service, 'Registered the service');
  });
});
