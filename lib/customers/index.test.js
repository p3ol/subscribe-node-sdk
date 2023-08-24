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

  describe('set()', () => {
    it('should allow to update a customer', async () => {
      nock(globalThis.__API_URL__)
        .post('/subscribe/customers/customer-id', {
          firstName: 'test',
          lastName: 'test',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          username: 'test@test.com',
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(
        await customers
          .set('customer-id', { firstName: 'test', lastName: 'test' })
      ).toMatchObject({
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

  describe('switchSubscriptionOffer()', () => {
    it('should allow to change a customer\'s subscription offer', async () => {
      nock(globalThis.__API_URL__)
        .post(
          '/subscribe/customers/customer-id/subscriptions/subscription-id' +
            '/change',
          {
            offer: 'premium-offer',
            clientId: globalThis.__CLIENT_ID__,
            clientSecret: globalThis.__CLIENT_SECRET__,
          }
        )
        .reply(200, {
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(
        await customers.switchSubscriptionOffer(
          'customer-id',
          'subscription-id',
          'premium-offer'
        )
      ).toMatchObject({
        subscription: {
          id: 'subscription-id',
        },
      });
    });
    it('should allow to change a customer\'s subscription offer', async () => {
      nock(globalThis.__API_URL__)
        .post(
          '/subscribe/customers/customer-id/subscriptions/subscription-id' +
            '/change',
          {
            offer: 'premium-offer',
            price: 'price_id',
            clientId: globalThis.__CLIENT_ID__,
            clientSecret: globalThis.__CLIENT_SECRET__,
          }
        )
        .reply(200, {
          subscription: {
            id: 'subscription-id',
            price: 'price_id'
          },
        });

      expect(
        await customers.switchSubscriptionOffer(
          'customer-id',
          'subscription-id',
          'premium-offer',
          { price: 'price_id' }
        )
      ).toMatchObject({
        subscription: {
          id: 'subscription-id',
          price: 'price_id'
        },
      });
    });
  });

  describe('cancelSubscription()', () => {
    it('should allow to cancel a customer subscription', async () => {
      nock(globalThis.__API_URL__)
        .post(
          '/subscribe/customers/customer-id/subscriptions/subscription-id' +
            '/cancel',
          {
            clientId: globalThis.__CLIENT_ID__,
            clientSecret: globalThis.__CLIENT_SECRET__,
          }
        )
        .reply(200, {
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(
        await customers.cancelSubscription('customer-id', 'subscription-id')
      ).toMatchObject({
        subscription: {
          id: 'subscription-id',
        },
      });
    });
  });

  describe('reactivateSubscription()', () => {
    it('should allow to reactivate a canceled subscription', async () => {
      nock(globalThis.__API_URL__)
        .post(
          '/subscribe/customers/customer-id/subscriptions/subscription-id' +
            '/reactivate',
          {
            clientId: globalThis.__CLIENT_ID__,
            clientSecret: globalThis.__CLIENT_SECRET__,
          }
        )
        .reply(200, {
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(
        await customers.reactivateSubscription('customer-id', 'subscription-id')
      ).toMatchObject({
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
