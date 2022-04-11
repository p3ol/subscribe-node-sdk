'use strict';

function Subscribe ({
  clientId,
  clientSecret,
  apiUrl = 'https://api.poool.fr/api/v3',
  timeout = 30000,
} = {}) {
  if (!clientId || !clientSecret) {
    throw new Error('clientId and/or clientSecret were not provided. Please ' +
      'use Subscribe({ clientId: \'client-id\', clientSecret: ' +
      '\'client-secret\' }) in order to use this library.');
  }


}

module.exports = Subscribe;
//# sourceMappingURL=dist.cjs.js.map
