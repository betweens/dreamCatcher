const Response = require('../utils/response');
const { InvalidRequestBodyFormat } = require('../errors');
const logger = require('../utils/logger');

const {
  UNKNOWN_ENDPOINT,
  INVALID_REQUEST_BODY_FORMAT,
  UNKNOWN_ERROR
} = require('../constants/error');

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 404) {
        Response.notFound(ctx, UNKNOWN_ENDPOINT);
        logger.error('Unhandled by router');
      }
    } catch (err) {
      logger.error('An error occured: %s', err);
      if (err instanceof InvalidRequestBodyFormat) {
        Response.unprocessableEntity(ctx, INVALID_REQUEST_BODY_FORMAT);
      } else {
        Response.internalServerError(ctx, UNKNOWN_ERROR);
      }
    }
  };
};
