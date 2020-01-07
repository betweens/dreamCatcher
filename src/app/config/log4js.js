const env = process.env.NODE_ENV || 'development';
const config = {
  appenders: {
    out: { type: 'stdout' },
    app: {
      type: 'dateFile',
      filename: 'logs/application.log',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      daysToKeep: 7
    }
  },
  categories: {
    default: { appenders: ['app'], level: 'all' }
  }
};

if (env === 'development') {
  config.categories.default.appenders = ['out'];
}

module.exports = config;
