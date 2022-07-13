/* eslint-disable no-console */
const Subscribe = require('../dist/index.cjs.js');

const subs = Subscribe({
  clientId: '8229685410804140',
  clientSecret: 'Cxs1fey6CBGg8ghErxba200u0ZgAdbeJ',
  debug: false,
});

(async () => {
  try {
    // Offers
    try{

      const offers = await subs.offers.list({ exclude: ['premium'] });
      console.log('offers.list', offers);
    } catch (e) {
      console.error(e)
    }

      const callback = await subs.auth.createCallback(
        'password',
        'http://localhost',
        'john@doe.fr',
        'aaa'
      );
      console.log('auth.createCallback', callback);

    const verify = await subs.auth
      .verifyCallback(callback.callbackId);
    console.log('auth.verifyCallback', verify);
  } catch (e) {
    console.error(e);
  }
})();
