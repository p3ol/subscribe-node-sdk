module.exports = {
  extends: ['@poool/eslint-config-node'],
  globals: {
    btoa: false,
    fetch: false,
  },
  overrides: [{
    files: ['tests/**/*.js'],
    env: {
      jest: true,
    },
  }],
};
