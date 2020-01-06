const debug = require('debug')('koa:error-handler');
const Response = require('../utils/response');
const { InvalidRequestBodyFormat } = require('../errors');
const {
  UNKNOWN_ENDPOINT,
  INVALID_REQUEST_BODY_FORMAT,
  UNKNOWN_ERROR
} = require('../constants/error');

module.exports = () => {
  debug('Create a middleware');
  return async (ctx, next) => {
    try {
      const result = await next();
      if (!ctx.body && (!ctx.status || ctx.status === 404)) {
        debug('Unhandled by router');
        return Response.notFound(ctx, UNKNOWN_ENDPOINT);
      }
      return result;
    } catch (err) {
      debug('An error occured: %s', err.name);
      if (err instanceof InvalidRequestBodyFormat) {
        return Response.unprocessableEntity(ctx, INVALID_REQUEST_BODY_FORMAT);
      }
      return Response.internalServerError(ctx, UNKNOWN_ERROR);
    }
  };
};
