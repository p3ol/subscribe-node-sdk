import nock from 'nock';

import Subscribe from '../';
import Payments from './';

describe('payments.js', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
    accessToken: 'foo',
    refreshToken: 'bar',
  });
  const payments = new Payments(client);

  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('createIntent()', () => {
    it('should allow to create a payment intent', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/payments/stripe/intent', {
          offer: 'premium-offer',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          paymentId: 'payment-id',
          intentId: 'payment-intent-id',
        });

      expect(await payments.createIntent('stripe', 'premium-offer'))
        .toMatchObject({
          paymentId: 'payment-id',
          intentId: 'payment-intent-id',
        });
    });
  });

  describe('confirmIntent()', () => {
    it('should allow to confirm a previously created intent', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/payments/stripe/intent/confirm/payment-id', {
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          payment: {
            id: 'payment-id',
          },
          subscription: {
            id: 'subscription-id',
          },
        });

      expect(await payments.confirmIntent('stripe', 'payment-id'))
        .toMatchObject({
          payment: {
            id: 'payment-id',
          },
          subscription: {
            id: 'subscription-id',
          },
        });
    });
  });

  describe('createSetupIntent()', () => {
    it('should allow to create a setup intent (when changing ' +
      'card)', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/payments/stripe/intent/setup', {
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          clientSecret: 'secret-id',
        });

      expect(await payments.createSetupIntent('stripe'))
        .toMatchObject({ clientSecret: 'secret-id' });
    });
  });

  describe('updateSource()', () => {
    it('should allow to change a payment method', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/payments/stripe/method/update', {
          method: 'card-id',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, { updated: true });

      expect(await payments.updateSource('stripe', 'card-id'))
        .toMatchObject({ updated: true });
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
