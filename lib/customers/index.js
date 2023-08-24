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
   * @param {Object} reqOpts (optional) Request options
   * @returns {Promise} Customer object
   */
  async get (customerId, reqOpts = {}) {
    return this.client.request({
      ...reqOpts,
      method: 'GET',
      resource: '/subscribe/customers/' + assert(customerId),
    });
  }

  /**
   * Update a particular customer
   * @param {String} customerId Customer ID
   * @param {Object} updates (optional) Updates to apply
   * @param {Object} reqOpts (optional) Request options
   * @returns {Promise} Customer object
   */
  async set (customerId, updates = {}, reqOpts = {}) {
    return this.client.request({
      ...reqOpts,
      method: 'POST',
      resource: '/subscribe/customers/' + assert(customerId),
      body: {
        ...reqOpts.body,
        ...updates,
      },
    });
  }

  /**
   * Attach an existing stripe/paypal/... subscription to a customer
   * @param {String} customerId Customer ID
   * @param {String} gateway Gateway name (stripe, paypal)
   * @param {Object} subscription Subscription info
   * @param {Object} reqOpts (optional) Request options
   * @returns {Promise} Customer object
   */
  async attachExistingSubscription (
    customerId,
    gateway,
    subscription = {},
    reqOpts = {}
  ) {
    return this.client.request({
      ...reqOpts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(gateway)}/add/external`,
      body: {
        ...reqOpts.body,
        ...subscription,
      },
    });
  }

  /**
   * Subscribe a customer to a different offer (upgrade or downgrade)
   * @param {String} customerId Customer ID
   * @param {String} subscriptionId Subscription ID
   * @param {String} offer Offer ID or slug
   * @param {Object} opts (optional) Offer options
   *   @option {String} priceId (optional) Price ID (defaults to first one found)
   * @param {Object} reqOpts (optional) options Request options
   * @returns {Promise} { subscription }
   */
  async switchSubscriptionOffer (
    customerId,
    subscriptionId,
    offer,
    { priceId } = {},
    reqOpts = {}
  ) {
    return this.client.request({
      ...reqOpts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(subscriptionId)}/change`,
      body: {
        offer,
        price: priceId,
      },
    });
  }

  /**
   * Cancel a subscription for a customer
   * @param {String} customerId Customer ID
   * @param {String} subscriptionId Subscription ID
   * @param {Object} reqOpts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async cancelSubscription (customerId, subscriptionId, reqOpts = {}) {
    return this.client.request({
      ...reqOpts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(subscriptionId)}/cancel`,
    });
  }

  /**
   * Reactivate a canceled subscription for a customer
   * @param {String} customerId Customer ID
   * @param {String} subscriptionId Subscription ID
   * @param {Object} reqOpts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async reactivateSubscription (customerId, subscriptionId, reqOpts = {}) {
    return this.client.request({
      ...reqOpts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(subscriptionId)}/reactivate`,
    });
  }
}
