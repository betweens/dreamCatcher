'use strict';
const Koa = require('koa');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const bodyParser = require('./app/middlewares/body-parser');
const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/error-handler');
const corsConfig = require('./app/config/cors');
const config = require('./app/config/index');
const logger = require('./logger');
const router = require('./routes');

const app = new Koa();
app.use(errorHandler());
app.use(requestId());
app.use(logging({ logger, overrideSerializers: false }));
app.use(bodyParser({ enableTypes: ['json'], jsonLimit: '10mb' }));
app.use(cors({
  origins: corsConfig.origins,
  allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
}));

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(config.port, config.host, () => {
  logger.info({ event: 'execute' }, `API server listening on ${config.host}:${config.port}, in ${config.env}`);
});

server.on('error', (ctx) => {
  if (ctx == null) {
    logger.error({ err, event: 'error' }, 'Unhandled exception occured');
  }
});
