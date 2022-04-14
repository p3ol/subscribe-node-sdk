import nock from 'nock';

import Subscribe from '../';
import * as _ from './';

describe('createSubscriptionIntent.js', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
    accessToken: 'foo',
    refreshToken: 'bar',
  });

  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('createSubscriptionIntent()', () => {
    it('should allow to create a subscription intent', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/payments/stripe/subscribe', {
          offer: 'premium-offer',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          payment: { id: 'payment-id' },
          subscription: { id: 'subscription-id' },
          intentId: 'payment-intent-id',
        });

      expect(await client.subscriptions.intent('stripe', 'premium-offer'))
        .toMatchObject({
          payment: { id: 'payment-id' },
          subscription: { id: 'subscription-id' },
          intentId: 'payment-intent-id',
        });
    });
  });

  describe('confirmSubscriptionIntent()', () => {
    it('should allow to confirm a previously created intent', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/payments/stripe/subscribe/confirm/subscription-id', {
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(await client.subscriptions.confirm('stripe', 'subscription-id'))
        .toMatchObject({
          subscription: {
            id: 'subscription-id',
          },
        });
    });
  });

  describe('switchOffer()', () => {
    it('should allow to change a subscription offer', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/subscriptions/subscription-id/change', {
          offer: 'premium-offer',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(await client.subscriptions
        .switch('subscription-id', 'premium-offer')
      ).toMatchObject({
        subscription: {
          id: 'subscription-id',
        },
      });
    });
  });

  describe('cancel()', () => {
    it('should allow to cancel a subscription', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/subscriptions/subscription-id/cancel', {
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(await client.subscriptions.cancel('subscription-id'))
        .toMatchObject({
          subscription: {
            id: 'subscription-id',
          },
        });
    });
  });

  describe('cancel()', () => {
    it('should allow to reactivate a canceled subscription', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/subscriptions/subscription-id/reactivate', {
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(await client.subscriptions.reactivate('subscription-id'))
        .toMatchObject({
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
