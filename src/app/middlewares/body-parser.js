const bodyParser = require('koa-bodyparser');
const { InvalidRequestBodyFormat } = require('../errors');
const logger = require('../utils/logger');

module.exports = (options = {}) => {
  return bodyParser({
    ...options,
    options: () => {
      logger.error('Invalid format is detected in the request body');
      throw new InvalidRequestBodyFormat(
        'Invalid format is detected in the request body'
      );
    }
  });
};
