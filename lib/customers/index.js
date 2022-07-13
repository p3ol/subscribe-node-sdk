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
   * Update a particular customer
   * @param {String} customerId Customer ID
   * @param {Object} updates (optional) Updates to apply
   * @param {Object} opts (optional) Request options
   * @returns {Promise} Customer object
   */
  async set (customerId, updates = {}, opts = {}) {
    return this.client.request({
      ...opts,
      method: 'POST',
      resource: '/subscribe/customers/' + assert(customerId),
      body: {
        ...opts.body,
        ...updates,
      },
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
  async switchSubscriptionOffer (customerId, subscriptionId, offer, opts = {}) {
    return this.client.request({
      ...opts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(subscriptionId)}/change`,
      body: {
        offer,
      },
    });
  }

  /**
   * Cancel a subscription for a customer
   * @param {String} customerId Customer ID
   * @param {String} subscriptionId Subscription ID
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async cancelSubscription (customerId, subscriptionId, opts = {}) {
    return this.client.request({
      ...opts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(subscriptionId)}/cancel`,
    });
  }

  /**
   * Reactivate a canceled subscription for a customer
   * @param {String} customerId Customer ID
   * @param {String} subscriptionId Subscription ID
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async reactivateSubscription (customerId, subscriptionId, opts = {}) {
    return this.client.request({
      ...opts,
      method: 'POST',
      resource: `/subscribe/customers/${assert(customerId)}` +
        `/subscriptions/${assert(subscriptionId)}/reactivate`,
    });
  }
}
