import nock from 'nock';

import Subscribe from '../';
import * as _ from './';

describe('auth.js', () => {
  const client = Subscribe({
    apiUrl: globalThis.__API_URL__,
    clientId: globalThis.__CLIENT_ID__,
    clientSecret: globalThis.__CLIENT_SECRET__,
  });

  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('signin()', () => {
    it('should allow to sign in with username and password', async () => {
      nock(globalThis.__API_URL__)
        .post('/subscribe/auth/token', {
          grantType: 'password',
          username: 'username',
          password: 'password',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        });

      const tokens = await client.auth.signin({
        username: 'username',
        password: 'password',
      });

      expect(tokens).toMatchObject({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
      expect(client.auth.credentials).toMatchObject({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });
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

      const callback = await client.auth.createCallback({
        grantType: 'bearer',
        redirectUri: 'http://localhost:3000/callback',
      }, { auth: { accessToken: 'foo' } });

      expect(callback).toMatchObject({
        callbackId: 'callback-id',
      });
    });

    it('should allow to create a callback with username and ' +
      'password', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
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

      const callback = await client.auth.createCallback({
        grantType: 'password',
        username: 'username',
        password: 'password',
        redirectUri: 'http://localhost/callback',
      }, { auth: { accessToken: 'foo' } });

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

      const tokens = await client.auth.verifyCallback('callback-id');

      expect(tokens).toMatchObject({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        redirectUri: 'http://localhost/callback',
      });
      expect(client.auth.credentials).toMatchObject({
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      });
    });
  });

  describe('me()', () => {
    it('should allow to get the current user', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .get('/subscribe/auth/me')
        .query({
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          username: 'username',
        });

      const user = await client.auth.me({ auth: { accessToken: 'foo' } });

      expect(user).toMatchObject({
        username: 'username',
      });
    });
  });

  describe('signup()', () => {
    it('should allow to signup', async () => {
      nock(globalThis.__API_URL__)
        .put('/subscribe/account', {
          firstName: 'test',
          lastName: 'test',
          username: 'test@test.com',
          password: 'test',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          username: 'test@test.com',
          email: 'test@test.com',
          locale: 'fr',
        });

      const user = await client.auth.signup({
        firstName: 'test',
        lastName: 'test',
        username: 'test@test.com',
        password: 'test',
      });

      expect(user).toMatchObject({
        username: 'test@test.com',
        email: 'test@test.com',
        locale: 'fr',
      });
    });
  });

  describe('setAccount()', () => {
    it('should allow to update an account', async () => {
      nock(globalThis.__API_URL__)
        .matchHeader('Authorization', 'Bearer foo')
        .post('/subscribe/account', {
          firstName: 'test',
          lastName: 'test',
          username: 'test@test.com',
          password: 'test',
          clientId: globalThis.__CLIENT_ID__,
          clientSecret: globalThis.__CLIENT_SECRET__,
        })
        .reply(200, {
          account: {
            username: 'test@test.com',
            email: 'test@test.com',
            locale: 'fr',
          },
        });

      const user = await client.auth.set({
        firstName: 'test',
        lastName: 'test',
        username: 'test@test.com',
        password: 'test',
      }, { auth: { accessToken: 'foo' } });

      expect(user).toMatchObject({
        account: {
          username: 'test@test.com',
          email: 'test@test.com',
          locale: 'fr',
        },
      });
    });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
    delete client.auth.credentials.accessToken;
    delete client.auth.credentials.refreshToken;
  });
});
