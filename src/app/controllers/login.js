const KoaRouter = require('@koa/router');
const userServers = require('../servers/userServers');
const { UNKNOWN_ERROR } = require('../constants/error');
const { tokenGenerator } = require('../utils/token');
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
    const result = await userLogin(username);
    if (result.length) {
      const { id, name } = result[0];
      const userInfo = {
        id,
        name
      };
      const token = tokenGenerator(userInfo);
      return Response.ok(ctx, {
        message: 'success',
        code: '0000',
        data: { ...userInfo, token }
      });
    }
    return Response.forbidden(ctx, {
      message: '用户名或密码错误',
      data: null
    });
  } catch (error) {
    logger.error(error);
    Response.serviceUnavailable(ctx, UNKNOWN_ERROR);
  }
});

router.post('/test', ctx => {
  ctx.body = {
    name: ctx.state.user
  };
});

module.exports = router;
