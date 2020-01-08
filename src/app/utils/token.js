const jwt = require('jsonwebtoken');
const config = require('../config');

const { secretKey } = config;
const jwtOptions = {
  expiresIn: '1h'
};
// 生成token
const tokenGenerator = payload => {
  return jwt.sign(payload, secretKey, jwtOptions);
};

// 验证token
const verifyToken = token => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  tokenGenerator,
  verifyToken
};
