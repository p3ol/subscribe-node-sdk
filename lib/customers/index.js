import { assert } from '../utils/assert';

export default class Customer {

  /**
   * @constructor
   * @param {SubscribeClient} client
   */
  constructor (client) {
    this.client = client;
  }

  /**
   * Retrieves a particular customer
   * @param {String} customerId Customer ID
   * @param {Object} opts (optional) Request options
   * @returns {Promise} Customer object
   */
  async get (customerId, opts = {}) {
    return this.client.request({
      ...opts,
      method: 'GET',
      resource: '/subscribe/customers/' + assert(customerId),
    });
  }

  /**
   * Attach an existing stripe/paypal/... subscription to a customer
   * @param {String} customerId Customer ID
   * @param {String} gateway Gateway name (stripe, paypal)
   * @param {Object} subscription Subscription info
   * @param {Object} opts (optional) Request options
   * @returns {Promise} Customer object
   */
  async attachExistingSubscription (
    customerId,
    gateway,
    subscription = {},
    opts = {}
  ) {
    return this.client.request({
      ...opts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(gateway)}/add/external`,
      body: {
        ...opts.body,
        ...subscription,
      },
    });
  }

  /**
   * Subscribe a customer to a different offer (upgrade or downgrade)
   * @param {String} customerId Customer ID
   * @param {String} subscriptionId Subscription ID
   * @param {String} offer Offer ID or slug
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async switchOffer (customerId, subscriptionId, offer, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(subscriptionId)}/change`,
      body: {
        offer,
      },
    });
  }
}
