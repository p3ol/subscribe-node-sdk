import https from 'https';

import fetch, { Request } from 'node-fetch';
import queryString from 'query-string';

import { debug } from './logger';

const parseResponse = async response => {
  let payload = {};

  if (response.status >= 400) {
    payload.url = response.url;
    payload.code = response.status;
    payload.message = await response.text();
    payload.status = response.status;
    payload.statusText = response.statusText;
    throw payload;
  }

  try {
    payload = await response.json();
  } catch (e) {
    payload.code = 0;
    payload.message = e;
    throw payload;
  }

  return payload;
};

export const request = async (client, options = {}) => {
  let timer;

  const requestTimeout = new Promise((resolve, reject) => {
    const time = options.timeout || client.timeout;
    timer = setTimeout(() => {
      const response = {
        code: 0,
        message: 'Request timeout',
      };
      reject(response);
    }, time);
  });

  if (options.resource) {
    options.url = client.apiUrl + options.resource;
    delete options.resource;
  }

  options.url = options.method !== 'GET' ? options.url : options.url + '?' +
    queryString.stringify({
      ...(options.qs || {}),
      clientId: client.clientId,
      clientSecret: client.clientSecret,
    }, { arrayFormat: 'comma' });

  options.headers = options.headers || {};
  options.headers.Platform = 9;

  if (options.headers['Content-Type'] === false) {
    delete options.headers['Content-Type'];
  } else {
    options.headers['Content-Type'] = options.headers['Content-Type'] ||
      'application/json; charset=UTF-8';
  }

  let body, request, response;

  try {
    if (options.body && options.method !== 'GET') {
      body = JSON.stringify(options.body);
    }

    const params = {
      headers: options.headers,
      method: options.method,
      agent: process.env.NODE_ENV === 'development' ? new https.Agent({
        rejectUnauthorized: false,
      }) : options.agent,
      body,
    };

    debug(client, `Creating request for ${options.url}, options: `, options);

    request = new Request(options.url, params);

    response = await Promise.race([
      requestTimeout,
      fetch(options.url, params),
    ]);
    clearTimeout(timer);
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }

  /* istanbul ignore next: can't test this with nock, here just in case */
  if (!response || !response.json) {
    const response = {
      code: 0,
      message: 'Network error',
    };
    throw response;
  }

  response.request = request;

  return options.returnFullResponse ? response : parseResponse(response);
};
