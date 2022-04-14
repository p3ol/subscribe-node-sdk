import { assert } from '../utils/assert';

export const getCustomer = (client, customerId, opts = {}) =>
  client.request({
    ...opts,
    method: 'GET',
    resource: '/subscribe/customers/' + assert(customerId),
  });

export const attachExistingSubscription = (
  client,
  customerId,
  gateway,
  subscription = {},
  opts = {}
) => client.request({
  ...opts,
  method: 'POST',
  resource: `/subscribe/customers/${assert(customerId)}` +
    `/subscriptions/${assert(gateway)}/add/external`,
  body: {
    ...opts.body,
    ...subscription,
  },
});
