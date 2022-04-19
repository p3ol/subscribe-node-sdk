import { request, requestWithRetry } from './http';
import Offers from './offers';
import Auth from './auth';
import Customers from './customers';
import Payments from './payments';
import Subscriptions from './subscriptions';

class SubscribeClient {
  request = request.bind(null, this);
  requestWithRetry = requestWithRetry.bind(null, this);

  auth = new Auth(this);
  customers = new Customers(this);
  offers = new Offers(this);
  payments = new Payments(this);
  subscriptions = new Subscriptions(this);

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
