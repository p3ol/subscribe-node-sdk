export const listOffers = async (client, {
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
