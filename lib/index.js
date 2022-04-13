import { request } from './http';
import { listOffers } from './offers';
import { createCallback, verifyCallback, me } from './auth';

class SubscribeClient {
  constructor ({
    clientId,
    clientSecret,
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

    this.request = request.bind(null, this);

    this.offers = {
      list: listOffers.bind(null, this),
    };

    this.auth = {
      createCallback: createCallback.bind(null, this),
      verifyCallback: verifyCallback.bind(null, this),
      me: me.bind(null, this),
    };
  }
}

export default function Subscribe (...args) {
  return new SubscribeClient(...args);
}
