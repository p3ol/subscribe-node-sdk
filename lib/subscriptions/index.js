import { assert } from '../utils/assert.js';

export const createSubscriptionIntent = (client, gateway, offer, opts = {}) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/payments/${assert(gateway)}/subscribe`,
    body: {
      ...opts.body,
      offer: assert(offer),
    },
  });

export const confirmSubscriptionIntent = (
  client,
  gateway,
  subscriptionId,
  opts = {}
) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/payments/${assert(gateway)}` +
      `/subscribe/confirm/${assert(subscriptionId)}`,
  });

export const switchOffer = (
  client,
  subscriptionId,
  offer,
  opts = {}
) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/subscriptions/${assert(subscriptionId)}/change`,
    body: {
      offer,
    },
  });

export const cancel = (client, subscriptionId, opts = {}) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/subscriptions/${assert(subscriptionId)}/cancel`,
  });

export const reactivate = (client, subscriptionId, opts = {}) =>
  client.requestWithRetry({
    ...opts,
    method: 'POST',
    resource: `/subscribe/subscriptions/${assert(subscriptionId)}/reactivate`,
  });
