import nock from 'nock';
import { FetchError } from 'node-fetch';

import Subscribe from '../';
import { request as _ } from './';

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

    it('should allow to make a request with query string params', async () => {
      nock(globalThis.__API_URL__)
        .get('/test')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
          foo: 'bar',
        })
        .reply(200, { bar: 'foo' });

      const res = await client.request({
        method: 'GET',
        resource: '/test',
        qs: {
          foo: 'bar',
        },
      });

      expect(res).toMatchObject({ bar: 'foo' });
    });

    it('should allow to make a POST request', async () => {
      nock(globalThis.__API_URL__)
        .post('/test', {
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
          foo: 'bar',
        })
        .reply(200, { bar: 'foo' });

      const res = await client.request({
        method: 'POST',
        resource: '/test',
        body: {
          foo: 'bar',
        },
      });

      expect(res).toMatchObject({ bar: 'foo' });
    });

    it('should fail before timeout if req takes too much time', async () => {
      nock(globalThis.__API_URL__)
        .get('/test')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .delay(200)
        .reply(200, { foo: 'bar' });

      let error;

      try {
        await client.request({
          method: 'GET',
          resource: '/test',
          timeout: 100,
        });
      } catch (e) {
        error = e;
      }

      expect(error).toMatchObject({
        code: 0,
        message: 'Request timeout',
      });
    });

    it('should throw an error if res status is >= 400', async () => {
      nock(globalThis.__API_URL__)
        .get('/test')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(401, { error: 'unauthorized' });

      let error;

      try {
        await client.request({
          method: 'GET',
          resource: '/test',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toMatchObject({
        url: globalThis.__API_URL__ +
          `/test?clientId=${globalThis.__CLIENT_ID__}` +
          `&clientSecret=${globalThis.__CLIENT_SECRET__}`,
        code: 401,
        status: 401,
        message: { error: 'unauthorized' },
      });
    });

    it('should throw an error if response is not json based', async () => {
      nock(globalThis.__API_URL__)
        .get('/test')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, '<html></html>');

      let error;

      try {
        await client.request({
          method: 'GET',
          resource: '/test',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toMatchObject({
        code: 0,
        message: new FetchError(
          'invalid json response body at http://localhost/api/test' +
          '?clientId=client-id&clientSecret=client-secret reason: ' +
          'Unexpected token \'<\', \"<html></html>\" is not valid JSON'
        ),
      });
    });

    it('should allow to send requests without json', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Content-Type', val => typeof val === 'undefined')
        .get('/test')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, { foo: 'bar' });

      const res = await client.request({
        method: 'GET',
        resource: '/test',
        headers: {
          'Content-Type': false,
        },
      });

      expect(res).toMatchObject({
        foo: 'bar',
      });
    });

    it('should allow to send authorization', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .get('/test')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, { foo: 'bar' });

      const res = await client.request({
        method: 'GET',
        resource: '/test',
        auth: {
          accessToken: 'foo',
          refreshToken: 'bar',
        },
      });

      expect(res).toMatchObject({
        foo: 'bar',
      });
    });
  });
});
