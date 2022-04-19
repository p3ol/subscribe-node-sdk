import { assert } from '../utils/assert.js';

export default class Subscriptions {
  /**
   * @constructor
   * @param {SubscribeClient} client
   */
  constructor (client) {
    this.client = client;
  }

  /**
   * Create a subscription intent (needed to create a subscription later on)
   * @param {String} gateway Gateway name (stripe)
   * @param {String} offer Offer ID or slug
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { intentId, subscriptionId }
   */
  async createIntent (gateway, offer, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/payments/${assert(gateway)}/subscribe`,
      body: {
        ...opts.body,
        offer,
      },
    });
  }

  /**
   * Confirm the previously created subscription intent
   * @param {String} gateway Gateway name (stripe)
   * @param {String} subscriptionId Subscription ID
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async confirmIntent (gateway, subscriptionId, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/payments/${assert(gateway)}` +
        `/subscribe/confirm/${assert(subscriptionId)}`,
    });
  }

  /**
   * Subscribe a user to a different offer (upgrade or downgrade)
   * @param {String} subscriptionId Subscription ID
   * @param {String} offer Offer ID or slug
   * @param {*} opts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async switchOffer (subscriptionId, offer, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/subscriptions/${assert(subscriptionId)}/change`,
      body: {
        offer,
      },
    });
  }

  /**
   * Cancel a subscription
   * @param {*} subscriptionId Subscription ID
   * @param {*} opts (optional) Request options
   * @returns {Promise} { subscription }
   */
  async cancel (subscriptionId, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/subscriptions/${assert(subscriptionId)}/cancel`,
    });
  }

  /**
   * Reactivate a canceled subscription
   * @param {*} subscriptionId Subscription ID
   * @param {*} opts (optional) Request options
   * @returns {Promise}
   */
  async reactivate (subscriptionId, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/subscriptions/${assert(subscriptionId)}/reactivate`,
    });
  }
}
