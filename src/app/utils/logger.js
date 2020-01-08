const log4js = require('log4js');
const loggerConfig = require('../config/log4js');

log4js.configure(loggerConfig);

module.exports = (type = 'dreamer') => log4js.getLogger(type);
