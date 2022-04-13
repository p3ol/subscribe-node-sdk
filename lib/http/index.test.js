import nock from 'nock';

import Subscribe from '../';

describe('http.js', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
  });

  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('request()', () => {
    it('should allow to make a basic http/s request', async () => {
      nock(globalThis.__API_URL__)
        .get('/test')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, { foo: 'bar' });

      const res = await client.request({
        method: 'GET',
        resource: '/test',
      });

      expect(res).toMatchObject({ foo: 'bar' });
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
