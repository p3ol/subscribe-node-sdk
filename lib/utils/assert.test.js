import { assert } from './assert';

describe('assert.js', () => {
  describe('assert()', () => {
    it('should correctly assert', () => {
      expect(assert(true)).toBe(true);
      expect(() => assert(undefined)).toThrow(new Error('missing_parameter'));
      expect(() => assert(false, val => val))
        .toThrow(new Error('missing_parameter'));
      expect(() => assert(false, val => val, new Error('not_found')))
        .toThrow(new Error('not_found'));
    });
  });
});
