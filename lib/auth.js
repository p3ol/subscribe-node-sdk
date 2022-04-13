export const createCallback = (client, {
  username,
  password,
  redirectUri,
}) => client.request({
  method: 'POST',
  resource: '/subscribe/auth/callback',
  body: {
    grantType: 'password',
    username,
    password,
    redirectUri,
  },
});

export const verifyCallback = (client, callbackId) => client.request({
  method: 'POST',
  resource: '/subscribe/auth/token',
  body: {
    grantType: 'callback',
    callbackId,
  },
});

export const me = (client, { accessToken = '' }) => client.request({
  method: 'GET',
  resource: '/subscribe/auth/me',
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
