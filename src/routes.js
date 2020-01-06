const KoaRouter = require('@koa/router');
const logger = require('./logger');

const router = new KoaRouter();
router.get('/', ctx => {
  logger.info(ctx);
  ctx.body = {
    name: '1345'
  };
});

module.exports = router;
