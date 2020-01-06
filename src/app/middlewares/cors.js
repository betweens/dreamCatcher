const debug = require("debug")("koa:cors");
const cors = require("@koa/cors");

module.exports = (options = {}) => {
  debug("Create a middleware");
  const { origins = ["*"] } = options;
  debug("Initialize `origins`: ", origins);
  const validateOrigin = ctx => {
    if (origins.includes("*")) return "*";
    const origin = ctx.get("Origin");
    return origins.includes(origin) ? origin : null;
  };

  return cors({
    ...options,
    origin: validateOrigin
  });
};
