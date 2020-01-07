const KoaRouter = require('@koa/router');

const router = new KoaRouter();
router.post('/', ctx => {
  ctx.body = {
    name: '1345'
  };
});

module.exports = router;
