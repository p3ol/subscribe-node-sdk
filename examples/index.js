/* eslint-disable no-console */
const Subscribe = require('../dist/index.cjs.js');

const subs = Subscribe({
  clientId: '0893042862168465',
  clientSecret: '23WfqB4TbdKm1TnkQ0QrAIv4nZuQcHQ9',
  debug: false,
});

(async () => {
  try {
    // Offers
    const offers = await subs.offers.list({ exclude: ['premium'] });
    console.log('offers.list', offers);

    // Auth
    const tokens = await subs.auth.signin({
      username: 'ugo+test1@poool.fr',
      password: 'lol',
    });
    console.log('auth.signin', tokens);

    const callback = await subs.auth.createCallback({
      grantType: 'bearer',
      redirectUri: 'http://localhost',
    }, { auth: tokens });
    console.log('auth.createCallback', callback);

    const verify = await subs.auth
      .verifyCallback(callback.callbackId, { auth: tokens });
    console.log('auth.verifyCallback', verify);
  } catch (e) {
    console.error(e);
  }
})();
