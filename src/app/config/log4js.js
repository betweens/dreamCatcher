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
  categories: {},
  disableClustering: true,
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
};

if (env === 'development') {
  config.categories.default = {
    appenders: ['out'],
    level: 'all'
  };
} else {
  config.categories.default = {
    appenders: ['app'],
    level: 'all'
  };
}

module.exports = config;
