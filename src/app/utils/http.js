const { isString } = require('util');
const got = require('got');
const debug = require('debug')('api:http');

class HttpApi {
  constructor(options = {}) {
    this.options = {
      json: true,
      http: got,
      ...options
    };

    debug('Create an instance');

    const { baseUrl } = this.options;
    if (!(baseUrl && isString(baseUrl))) {
      throw new TypeError('`baseUrl` is required.');
    }

    debug(`baseUrl: ${baseUrl}`);

    const { http, ...httpOptions } = this.options;
    this.http = http.extend(httpOptions);

    debug('Configured HTTP client');
  }

  async _request(spec) {
    const { path, ...options } = spec;
    debug(`request: ${spec.method} ${path} (${this.options.baseUrl})`);

    const { statusCode, body } = await this.http(path, options);
    debug(`response: ${statusCode}`);
    return body;
  }
}

module.exports = HttpApi;
