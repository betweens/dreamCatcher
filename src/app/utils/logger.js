const log4js = require('log4js');
const loggerConfig = require('../config/log4js');

log4js.configure(loggerConfig);
const logger = log4js.getLogger('dreamer');

module.exports = logger;
