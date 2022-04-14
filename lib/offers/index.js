import { assert } from '../utils/assert';

export const listOffers = (client, {
  page = 1,
  count = 10,
  include = [],
  exclude = [],
  status = 'active',
} = {}, opts = {}) => client.request({
  ...opts,
  method: 'GET',
  resource: '/subscribe/offers',
  qs: {
    ...opts.qs,
    page,
    count,
    include,
    exclude,
    status,
  },
});

export const getOffer = (client, offerId, opts = {}) => client.request({
  ...opts,
  method: 'GET',
  resource: '/subscribe/offers/' + assert(offerId),
});
