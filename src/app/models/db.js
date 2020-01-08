const knex = require('knex');
let logger = require('../utils/logger');

logger = logger('mysql');

const mysqlHandle = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '123465',
    database: 'cAuth'
  },
  debug: process.env.NODE_ENV === 'development',
  log: {
    warn(message) {
      logger.warn(message);
    },
    error(message) {
      logger.error(message);
    },
    deprecate(message) {
      logger.fatal(message);
    },
    debug(message) {
      logger.debug(message);
    }
  }
});

module.exports = mysqlHandle;
