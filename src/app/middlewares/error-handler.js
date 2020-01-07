const Response = require('../utils/response');
const { InvalidRequestBodyFormat } = require('../errors');
const logger = require('../utils/logger');

const {
  UNKNOWN_ENDPOINT,
  INVALID_REQUEST_BODY_FORMAT,
  UNKNOWN_ERROR
} = require('../constants/error');

module.exports = () => {
  logger.info('Create a middleware');
  return async (ctx, next) => {
    try {
      const result = await next();
      if (!ctx.body && (!ctx.status || ctx.status === 404)) {
        logger.info('Unhandled by router');
        return Response.notFound(ctx, UNKNOWN_ENDPOINT);
      }
      return result;
    } catch (err) {
      logger.error('An error occured: %s', err);
      if (err instanceof InvalidRequestBodyFormat) {
        return Response.unprocessableEntity(ctx, INVALID_REQUEST_BODY_FORMAT);
      }
      return Response.internalServerError(ctx, UNKNOWN_ERROR);
    }
  };
};
