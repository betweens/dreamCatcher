const cors = require('@koa/cors');
const logger = require('../utils/logger');

module.exports = (options = {}) => {
  const { origins = ['*'] } = options;
  logger.info(`Create a middleware is cors the Initialize origins: ${origins}`);
  const validateOrigin = ctx => {
    if (origins.includes('*')) return '*';
    const origin = ctx.get('Origin');
    return origins.includes(origin) ? origin : null;
  };

  return cors({
    ...options,
    origin: validateOrigin
  });
};
