import { error, warn, info, debug, log } from './';

describe('logger.js', () => {
  const client = { debug: true };

  it('should error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    error(client, 'test');
    expect(spy).toHaveBeenCalledWith('[poool]', '[error]', 'test');
  });

  it('should warn', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    warn(client, 'test');
    expect(spy).toHaveBeenCalledWith('[poool]', '[warn]', 'test');
  });

  it('should info', () => {
    const spy = jest.spyOn(console, 'info').mockImplementation();
    info(client, 'test');
    expect(spy).toHaveBeenCalledWith('[poool]', '[info]', 'test');
  });

  it('should debug', () => {
    const spy = jest.spyOn(console, 'debug').mockImplementation();
    debug(client, 'test');
    expect(spy).toHaveBeenCalledWith('[poool]', '[debug]', 'test');
  });

  it('should log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    log(client, 'test');
    expect(spy).toHaveBeenCalledWith('[poool]', '[log]', 'test');
  });
});
