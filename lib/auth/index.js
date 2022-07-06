export default class Auth {
  credentials = {
    accessToken: null,
    refreshToken: null,
  };

  /**
   * @constructor
   * @param {SubscribeClient} client
   */
  constructor (client) {
    this.client = client;
  }

  /**
   * Step 1 of the JSAT (JSON Security Assertion Token) auth flow.
   * This flow requires the creation of a callbackId from the provider that
   * will be used by the consumer to redirect the user once it's signed in on
   * both sides. Thus, the provider can also become a consumer if the consumer
   * implements the same flow in the opposite way.
   *
   * The callbackId can be granted using two methods:
   * - "bearer": This uses the "Authorization" header to recognize an already
   * authenticated user and automatically attach the callback ownership to it
   * - "password": This first signs the user then attach the callback ownership
   *
   * Both methods require a redirectUri for the consumer to be able to redirect
   * the user once it's signed in on both sides.
   * @param {String} grantType JSAT callback grant type (bearer, password)
   * @param {String} redirectUri JSAT redirect uri
   * @param {String} username (optional) Username for "password" grant type
   * @param {String} password (optional) Password for "password" grant type
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { callbackId }
   */
  async createCallback (
    grantType,
    redirectUri,
    username = '',
    password = '',
    opts = {}
  ) {
    console.log( grantType,
      redirectUri,
      username,
      password,
      opts)
    return this.client.request({
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
  }

  /**
   * Step 2 of JSAT: Verify the previously created callback
   * @param {String} callbackId JSAT callback id
   * @param {Object} opts (optional) Request options
   * @returns {Promise} { accessToken, refreshToken, expiresIn, tokenType }
   */
  async verifyCallback (callbackId, opts = {}) {
    const tokens = await this.client.request({
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
      this.credentials.accessToken = tokens.accessToken;
      this.credentials.refreshToken = tokens.refreshToken;
    }

    return tokens;
  }

}
