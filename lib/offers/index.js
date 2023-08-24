import { assert } from '../utils/assert';

export default class Offers {
  /**
   * @constructor
   * @param {SubscribeClient} client
   */
  constructor (client) {
    this.client = client;
  }

  /**
   * List all available offers
   * @param {Number} page (optional) Current page (default: 1)
   * @param {Number} count (optional) Offers per page (default: 10)
   * @param {Array<String>} include (optional) Offers slugs to include
   * @param {Array<String>} exclude (optional) Offers slugs to exclude
   * @param {String} status (optional) Filter by offers status
   *    (active, inactive, archived)
   * @param {Object} reqOpts (optional) Request options
   * @returns {Promise} Array of offers object
   */
  async list (
    page = 1,
    count = 10,
    include = [],
    exclude = [],
    status = 'active',
    reqOpts = {}
  ) {
    return this.client.request({
      ...reqOpts,
      method: 'GET',
      resource: '/subscribe/offers',
      qs: {
        ...reqOpts.qs,
        page,
        count,
        include,
        exclude,
        status,
        sandbox
      },
    });
  }

  /**
   * Get a particular offer
   * @param {String} offerId Offer ID
   * @param {Object} reqOpts (optional) Request options
   * @returns {Promise} Offer object
   */
  async get (offerId, reqOpts = {}) {
    return this.client.request({
      ...reqOpts,
      method: 'GET',
      resource: '/subscribe/offers/' + assert(offerId),
    });
  }
}
