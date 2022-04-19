import { assert } from '../utils/assert';

export default class Payments {
  /**
   * @constructor
   * @param {SubscribeClient} client
   */
  constructor (client) {
    this.client = client;
  }

  /**
   * Create a payment intent (needed to create a payment later on)
   * @param {String} gateway Gateway name (stripe)
   * @param {String} offer Offer ID or slug
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { indentId }
   */
  async createIntent (gateway, offer, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/payments/${assert(gateway)}/intent`,
      body: {
        ...opts.body,
        offer,
      },
    });
  }

  /**
   * Confirm a previously created intent
   * @param {String} gateway Gateway name (stripe)
   * @param {String} paymentId Payment ID
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { paymentId }
   */
  async confirmIntent (gateway, paymentId, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/payments/${assert(gateway)}` +
        `/intent/confirm/${assert(paymentId)}`,
    });
  }

  /**
   * Create a setup intent (needed to update a payment method)
   * @param {String} gateway Gateway name (stripe)
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { intentSecret }
   */
  async createSetupIntent (gateway, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/payments/${assert(gateway)}/intent/setup`,
    });
  }

  /**
   * Update a payment method
   * @param {String} gateway Gateway name (stripe)
   * @param {Object} method Payment method info
   * @param {Object} opts (optional) Request options
   * @returns {Promise}
   */
  async updateSource (gateway, method, opts = {}) {
    return this.client.requestWithRetry({
      ...opts,
      method: 'POST',
      resource: `/subscribe/payments/${assert(gateway)}/method/update`,
      body: {
        ...opts.body,
        method,
      },
    });
  }
}
