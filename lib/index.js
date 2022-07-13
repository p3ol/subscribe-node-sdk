import { request } from './http';
import Offers from './offers';
import Auth from './auth';
import Customers from './customers';

class SubscribeClient {
  request = request.bind(null, this);

  auth = new Auth(this);
  customers = new Customers(this);
  offers = new Offers(this);

  constructor ({
    clientId,
    clientSecret,
    apiUrl = 'https://api.poool.fr/api/v3',
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
  }
}

export default function Subscribe (...args) {
  return new SubscribeClient(...args);
}
