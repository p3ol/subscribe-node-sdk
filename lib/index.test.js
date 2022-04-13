import Subscribe from './';

describe('Subscribe', () => {
  it('should allow to create a client using credentials', () => {
    const client = Subscribe({
      apiUrl: 'https://api.subscribe.com',
      clientId: 'client-id',
      clientSecret: 'client-secret',
    });

    expect(client.clientId).toBe('client-id');
    expect(client.clientSecret).toBe('client-secret');
  });

  it('should throw an error when client credentials are not present', () => {
    expect(() => Subscribe({})).toThrowError(
      'clientId and/or clientSecret were not provided. Please use ' +
      'Subscribe({ clientId: \'client-id\', clientSecret: \'client-secret\' ' +
      '}) in order to use this library.'
    );
  });

  it('should allow to provide global access & refresh tokens', () => {
    const client = Subscribe({
      apiUrl: 'https://api.subscribe.com',
      clientId: 'client-id',
      clientSecret: 'client-secret',
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(client.auth.credentials).toMatchObject({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });
  });
});
