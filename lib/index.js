import { request, requestWithRetry } from './http';
import { getOffer, listOffers } from './offers';
import Auth from './auth';
import Customers from './customers';
import {
  confirmIntent,
  createIntent,
  createSetupIntent,
  updateSource,
} from './payments';
import {
  cancel,
  confirmSubscriptionIntent,
  createSubscriptionIntent,
  reactivate,
  switchOffer,
} from './subscriptions';

class SubscribeClient {
  request = request.bind(null, this);
  requestWithRetry = requestWithRetry.bind(null, this);

  auth = new Auth(this);

  offers = {
    list: listOffers.bind(null, this),
    get: getOffer.bind(null, this),
  };

  customers = new Customers(this);

  payments = {
    intent: createIntent.bind(null, this),
    confirm: confirmIntent.bind(null, this),
    setupIntent: createSetupIntent.bind(null, this),
    updateSource: updateSource.bind(null, this),
  };

  subscriptions = {
    intent: createSubscriptionIntent.bind(null, this),
    confirm: confirmSubscriptionIntent.bind(null, this),
    switch: switchOffer.bind(null, this),
    cancel: cancel.bind(null, this),
    reactivate: reactivate.bind(null, this),
  };

  constructor ({
    clientId,
    clientSecret,
    accessToken,
    refreshToken,
    apiUrl = 'https://api.poool.develop:8443/api/v3',
    timeout = 30000,
    debug = false,
  } = {}) {
    if (!clientId || !clientSecret) {
      throw new Error(
        'clientId and/or clientSecret were not provided. Please ' +
        'use Subscribe({ clientId: \'client-id\', clientSecret: ' +
        '\'client-secret\' }) in order to use this library.'
      );
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.apiUrl = apiUrl;
    this.timeout = timeout;
    this.debug = debug;

    if (accessToken && refreshToken) {
      this.auth.credentials.accessToken = accessToken;
      this.auth.credentials.refreshToken = refreshToken;
    }
  }
}

export default function Subscribe (...args) {
  return new SubscribeClient(...args);
}
