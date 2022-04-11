export const listOffers = async (client, {
  page = 1,
  count = 10,
  include = [],
  exclude = [],
  status = 'active',
} = {}) => client.request({
  method: 'GET',
  resource: '/subscribe/offers',
  qs: {
    page,
    count,
    include,
    exclude,
    status,
  },
});
