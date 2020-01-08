const KoaRouter = require('@koa/router');
const userServers = require('../servers/userServers');
const { UNKNOWN_ERROR } = require('../constants/error');
const Response = require('../utils/response');

let logger = require('../utils/logger');

logger = logger('controllers:login.js');

const { userLogin } = userServers;

const router = new KoaRouter();
router.post('/login', async ctx => {
  try {
    const { username } = ctx.request.body;
    if (!username) {
      return Response.forbidden(ctx, {
        message: '用户名不能为空',
        data: null
      });
    }
    if (!password) {
      return Response.forbidden(ctx, {
        message: '密码不能为空',
        data: null
      });
    }
    const result = await userLogin(username, password);
    return Response.ok(ctx, {
      message: 'success',
      code: '0000',
      data: result
    });
  } catch (error) {
    logger.error(error);
    Response.serviceUnavailable(ctx, UNKNOWN_ERROR);
  }
});

module.exports = router;
