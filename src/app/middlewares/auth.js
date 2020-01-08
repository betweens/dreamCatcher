const unless = require('koa-unless');
const Response = require('../utils/response');
const { verifyToken } = require('../utils/token');
const { AUTH_REQUIRED } = require('../constants/error');
let logger = require('../utils/logger');

logger = logger('middlewares:auth.js');
const auth = async (ctx, next) => {
  try {
    const token = ctx.get('X-Request-Token');
    if (!token) return Response.unauthorized(ctx, AUTH_REQUIRED);
    const playLoad = verifyToken(token);
    delete ctx.state.user;
    ctx.state.user = playLoad;
    await next();
  } catch (err) {
    logger.error(err);
    Response.unauthorized(ctx, AUTH_REQUIRED);
  }
};

auth.unless = unless;

module.exports = auth;
