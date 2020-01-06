'use strict'

const koaRouter = require('@koa/router');
const router = new koaRouter();
router.get('/', (ctx) => {
  ctx.body = {
    name: '1345'
  }
});

module.exports = router;
