import nock from 'nock';

import Subscribe from '../';
import Auth from './';

describe('Auth', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
  });
  const auth = new Auth(client);

  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('createCallback()', () => {
    it('should allow to create a callback using existing auth', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/auth/callback', {
          grantType: 'bearer',
          redirectUri: 'http://localhost:3000/callback',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          callbackId: 'callback-id',
        });

      const callback = await auth.createCallback(
        'bearer',
        'http://localhost:3000/callback',
        null,
        null,
        { auth: { accessToken: 'foo' } }
      );

      expect(callback).toMatchObject({
        callbackId: 'callback-id',
      });
    });

    it('should allow to create a callback with username and ' +
      'password', async () => {
      nock(globalThis.__API_URL__)
        .post('/subscribe/auth/callback', {
          grantType: 'password',
          username: 'username',
          password: 'password',
          redirectUri: 'http://localhost/callback',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          callbackId: 'callback-id',
        });

      const callback = await auth.createCallback(
        'password',
        'http://localhost/callback',
        'username',
        'password',
        { auth: { accessToken: 'foo' } }
      );

      expect(callback).toMatchObject({
        callbackId: 'callback-id',
      });
    });
  });

  describe('verifyCallback()', () => {
    it('should allow to verify a callback', async () => {
      nock(globalThis.__API_URL__)
        .post('/subscribe/auth/token', {
          grantType: 'callback',
          callbackId: 'callback-id',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
          redirectUri: 'http://localhost/callback',
        });

      const tokens = await auth.verifyCallback('callback-id');

      expect(tokens).toMatchObject({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        redirectUri: 'http://localhost/callback',
      });
      expect(auth.credentials).toMatchObject({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
    delete auth.credentials.accessToken;
    delete auth.credentials.refreshToken;
  });
});
