const { isString } = require('util');
const got = require('got');
let logger = require('../utils/logger');

logger = logger('http');
class HttpApi {
  constructor(options = {}) {
    this.options = {
      json: true,
      http: got,
      ...options
    };
    const { baseUrl } = this.options;
    if (!(baseUrl && isString(baseUrl))) {
      throw new TypeError('`baseUrl` is required.');
    }
    const { http, ...httpOptions } = this.options;
    this.http = http.extend(httpOptions);
  }

  async _request(spec) {
    const { path, ...options } = spec;
    logger.info(`request: ${spec.method} ${path} (${this.options.baseUrl})`);
    const { statusCode, body } = await this.http(path, options);
    logger.info(`response: ${statusCode}`);
    return body;
  }
}

module.exports = HttpApi;
