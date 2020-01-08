const bodyParser = require('koa-bodyparser');
const { InvalidRequestBodyFormat } = require('../errors');
let logger = require('../utils/logger');

logger = logger('middlewares:body-parser.js');

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
