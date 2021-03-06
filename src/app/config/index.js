const env = process.env.NODE_ENV || 'development';
const configs = {
  base: {
    env,
    name: process.env.APP_NAME || 'Dreamer',
    host: process.env.APP_HOST || '0.0.0.0',
    port: 7070,
    secretKey: 'qwerty123'
  },
  production: {
    port: process.env.APP_PORT || 7071
  },
  development: {
    port: 7070
  },
  test: {
    port: 7072
  }
};
const config = Object.assign(configs.base, configs[env]);

module.exports = config;
