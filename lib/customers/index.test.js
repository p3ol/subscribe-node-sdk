import nock from 'nock';

import Subscribe from '../';
import Customers from './';

describe('customers.js', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
  });
  const customers = new Customers(client);

  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('get()', () => {
    it('should allow to get a customer (account + subscription)', async () => {
      nock(globalThis.__API_URL__)
        .get('/subscribe/customers/customer-id')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          username: 'test@test.com',
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(await customers.get('customer-id')).toMatchObject({
        username: 'test@test.com',
        subscription: {
          id: 'subscription-id',
        },
      });
    });
  });

  describe('attachExistingSubscription()', () => {
    it('should allow to attach a gateway subscription to an internal ' +
      'one', async () => {
      nock(globalThis.__API_URL__)
        .post(
          '/subscribe/customers/customer-id/subscriptions/stripe/add/external',
          {
            subscriptionId: 'external-subscription-id',
            priceId: 'external-price-id',
            clientId: globalThis.__CLIENT_ID__,
            clientSecret: globalThis.__CLIENT_SECRET__,
          }
        )
        .reply(200, {
          username: 'test@test.com',
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(await customers
        .attachExistingSubscription('customer-id', 'stripe', {
          subscriptionId: 'external-subscription-id',
          priceId: 'external-price-id',
        })
      ).toMatchObject({
        username: 'test@test.com',
        subscription: {
          id: 'subscription-id',
        },
      });
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
