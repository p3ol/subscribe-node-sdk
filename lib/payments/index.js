import { assert } from '../utils/assert.js';

export const createIntent = (client, gateway, offer, opts = {}) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/payments/${assert(gateway)}/intent`,
    body: {
      ...opts.body,
      offer,
    },
  });

export const confirmIntent = (client, gateway, paymentId, opts = {}) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/payments/${assert(gateway)}` +
      `/intent/confirm/${assert(paymentId)}`,
  });

export const createSetupIntent = (client, gateway, opts = {}) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/payments/${assert(gateway)}/intent/setup`,
  });

export const updateSource = (client, gateway, method, opts = {}) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/payments/${assert(gateway)}/method/update`,
    body: {
      ...opts.body,
      method,
    },
  });
