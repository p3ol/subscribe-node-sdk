const Subscribe = require('../dist/index.cjs.js');

const subs = Subscribe({
  clientId: '0893042862168465',
  clientSecret: '23WfqB4TbdKm1TnkQ0QrAIv4nZuQcHQ9',
});

(async () => {
  try {
    console.log(await subs.offers.list({ exclude: ['premium'] }));
  } catch (e) {
    console.error(e);
  }
})();
