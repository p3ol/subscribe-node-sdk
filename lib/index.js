import { request, requestWithRetry } from './http';
import { listOffers } from './offers';
import { signin, createCallback, verifyCallback, me } from './auth';

class SubscribeClient {
  request = request.bind(null, this);
  requestWithRetry = requestWithRetry.bind(null, this);

  offers = {
    list: listOffers.bind(null, this),
  };

  auth = {
    credentials: {
      accessToken: null,
      refreshToken: null,
    },
    signin: signin.bind(null, this),
    createCallback: createCallback.bind(null, this),
    verifyCallback: verifyCallback.bind(null, this),
    me: me.bind(null, this),
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
