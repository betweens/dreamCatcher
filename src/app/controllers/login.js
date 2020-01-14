const KoaRouter = require('@koa/router');
const userServers = require('../servers/userServers');
const { UNKNOWN_ERROR } = require('../constants/error');
const { tokenGenerator } = require('../utils/token');
const Response = require('../utils/response');
let logger = require('../utils/logger');

logger = logger('controllers:login.js');
const { userLogin, userRegister, cancelUser } = userServers;
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
      const { id, name, isvolid } = result[0];
      const userInfo = {
        id,
        name
      };
      if (isvolid) {
        const token = tokenGenerator(userInfo);
        return Response.ok(ctx, {
          message: 'success',
          code: '0000',
          data: { ...userInfo, token }
        });
      }
      return Response.forbidden(ctx, {
        message: '无效用户',
        data: null
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

router.post('/register', async ctx => {
  const { username, password, sex, age } = ctx.request.body;
  const result = await userRegister(username, password, sex, age);
  ctx.body = result;
});

router.get('/cancel-user', async ctx => {
  const { id } = ctx.state.user;
  const result = await cancelUser(id);
  if (result) {
    ctx.redirect('https://www.baidu.com');
  } else {
    Response.ok(ctx, {
      message: '注销失败',
      data: null
    });
  }
});

module.exports = router;
