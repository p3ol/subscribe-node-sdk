export const signin = async (client, {
  username,
  password,
}, opts = {}) => {
  const tokens = await client.request({
    ...opts,
    method: 'POST',
    resource: '/subscribe/auth/token',
    body: {
      ...opts.body,
      grantType: 'password',
      username,
      password,
    },
  });

  if (tokens.accessToken) {
    client.auth.credentials.accessToken = tokens.accessToken;
    client.auth.credentials.refreshToken = tokens.refreshToken;
  }

  return tokens;
};

export const createCallback = (client, {
  grantType,
  username,
  password,
  redirectUri,
}, opts = {}) => client.request({
  ...opts,
  method: 'POST',
  resource: '/subscribe/auth/callback',
  body: {
    ...opts.body,
    grantType,
    ...username && password && { username, password },
    redirectUri,
  },
});

export const verifyCallback = async (client, callbackId, opts = {}) => {
  const tokens = await client.request({
    ...opts,
    method: 'POST',
    resource: '/subscribe/auth/token',
    body: {
      ...opts.body,
      grantType: 'callback',
      callbackId,
    },
  });

  if (tokens.accessToken) {
    client.auth.credentials.accessToken = tokens.accessToken;
    client.auth.credentials.refreshToken = tokens.refreshToken;
  }

  return tokens;
};

export const me = (client, opts = {}) => client.requestwithRetry({
  ...opts,
  method: 'GET',
  resource: '/subscribe/auth/me',
});
