/* eslint-disable no-console */
const Subscribe = require('../dist/index.cjs.js');

const subs = Subscribe({
  clientId: '0893542862168465',
  clientSecret: '23Wf5B4TbdKm1TnkQ0QrAIv4nZuQcHQ9',
  debug: false,
});

(async () => {
  try {
    // Offers
    const offers = await subs.offers.list({ exclude: ['premium'] });
    console.log('offers.list', offers);

    // Auth
    const callback = await subs.auth.createCallback({
      username: 'test@poool.fr',
      password: 'test',
      redirectUri: 'http://localhost',
    });
    console.log('auth.createCallback', callback);

    const verify = await subs.auth.verifyCallback(callback.callbackId);
    console.log('auth.verifyCallback', verify);
  } catch (e) {
    console.error(e);
  }
})();
