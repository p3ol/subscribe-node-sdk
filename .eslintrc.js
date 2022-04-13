module.exports = {
  extends: ['@poool/eslint-config-node'],
  globals: {
    btoa: false,
    fetch: false,
  },
  overrides: [{
    files: ['**/*.test.js', 'tests/**/*.js'],
    env: {
      jest: true,
    },
  }],
};
