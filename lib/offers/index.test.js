import nock from 'nock';

import Subscribe from '../';
import Offers from './';

describe('offers.js', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
  });
  const offers = new Offers(client);

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
          sandbox: false,
        })
        .reply(200, {
          offers: [{
            id: 'offer-id',
            name: 'offer-name',
            price: 100,
          }],
          total: 1,
        });

      expect(await offers.list()).toMatchObject({
        offers: [{
          id: 'offer-id',
          name: 'offer-name',
          price: 100,
        }],
        total: 1,
      });
    });
  });

  describe('get()', () => {
    it('should allow to get an offer', async () => {
      nock(globalThis.__API_URL__)
        .get('/subscribe/offers/offer-id')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          id: 'offer-id',
          name: 'offer-name',
          price: 100,
        });

      expect(await offers.get('offer-id')).toMatchObject({
        id: 'offer-id',
        name: 'offer-name',
        price: 100,
      });
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
