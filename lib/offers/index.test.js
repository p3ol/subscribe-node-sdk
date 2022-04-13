import nock from 'nock';

import Subscribe from '../';
import * as _ from './';

describe('offers.js', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
  });

  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('list()', () => {
    it('should allow to get a list of active offers', async () => {
      nock(globalThis.__API_URL__)
        .get('/subscribe/offers')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
          page: 1,
          count: 10,
          status: 'active',
        })
        .reply(200, {
          offers: [{
            id: 'offer-id',
            name: 'offer-name',
            price: 100,
          }],
          total: 1,
        });

      expect(await client.offers.list()).toMatchObject({
        offers: [{
          id: 'offer-id',
          name: 'offer-name',
          price: 100,
        }],
        total: 1,
      });
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
