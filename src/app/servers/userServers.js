const knex = require('../models/db');

// 用户登陆
const userLogin = async username => {
  const result = await knex
    .from('users')
    .select()
    .where({ name: username });
  return result;
};

// 用户注册
const userRegister = async (name, password, sex, age) => {
  const result = await knex.from('users').insert({ name, password, sex, age });
  return result;
};

// 注销用户
const cancelUser = async id => {
  const result = await knex
    .from('users')
    .where('id', id)
    .update({ isvolid: 0 });
  return result;
};

module.exports = {
  userLogin,
  userRegister,
  cancelUser
};
