const Koa = require('koa');
const requireDirectory = require('require-directory');
const KoaRouter = require('@koa/router');
const requestId = require('@kasa/koa-request-id');
const bodyParser = require('./app/middlewares/body-parser');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/error-handler');
const corsConfig = require('./app/config/cors');
const config = require('./app/config/index');
const auth = require('./app/middlewares/auth');
let logger = require('./app/utils/logger');

logger = logger('app');
const app = new Koa();
app.use(errorHandler());
app.use(requestId());
app.use(bodyParser({ enableTypes: ['json'], jsonLimit: '10mb' }));
app.use(
  cors({
    origins: corsConfig.origins,
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
  })
);
app.use(auth.unless({ path: ['/', '/login', '/register'] }));
app.use(async (ctx, next) => {
  const start = Date.now();
  const { method, url, host, ip, query, body } = ctx.request;
  let client = {
    method,
    url,
    host,
    ip,
    // referer: headers.referer,
    // userAgent: headers['user-agent'],
    query,
    body
  };
  client = JSON.stringify(client);
  logger.info(`request info: ${client}`);
  await next();
  const responseTime = Date.now() - start;
  logger.info(
    `respones info: time: ${responseTime /
      1000}s, respones data: ${JSON.stringify(ctx.body)}`
  );
});

// 加载路由
requireDirectory(module, './app/controllers', {
  visit: obj => {
    if (obj instanceof KoaRouter) {
      app.use(obj.routes(), obj.allowedMethods());
    }
  }
});

const server = app.listen(config.port, config.host, () => {
  const serverInfo = `API server listening on http://${config.host}:${config.port}, in ${config.env}`;
  logger.info(serverInfo);
});

server.on('error', (err, ctx) => {
  if (ctx == null) {
    logger.error(`Unhandled exception occured${err}`);
  }
});
