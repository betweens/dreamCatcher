'use strict';
const debug = require('debug')('koa:bodyparser');
const bodyParser = require('koa-bodyparser');
const { InvalidRequestBodyFormat } = require('../errors');

module.exports = (options = {}) => {
  debug('Create a middleware');
  return bodyParser({
    ...options,
    options: () => {
      throw new InvalidRequestBodyFormat('Invalid format is detected in the request body');
    }
  })
}
