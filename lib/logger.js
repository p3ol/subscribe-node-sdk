/* eslint-disable no-console */
const logger = (client, method, logLevel, ...args) => {
  if (client.debug) {
    console[method]('[poool]', `[${method}]`, ...args);
  }
};

export const error = (client, ...args) =>
  logger(client, 'error', 1, ...args);

export const warn = (client, ...args) =>
  logger(client, 'warn', 2, ...args);

export const info = (client, ...args) =>
  logger(client, 'info', 3, ...args);

export const debug = (client, ...args) =>
  logger(client, 'debug', 4, ...args);

export const log = (client, ...args) =>
  logger(client, 'log', 5, ...args);
