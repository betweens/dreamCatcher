const KoaRouter = require('@koa/router');

const router = new KoaRouter();
router.post('/login', ctx => {
  ctx.body = {
    name: '1345'
  };
});

module.exports = router;
