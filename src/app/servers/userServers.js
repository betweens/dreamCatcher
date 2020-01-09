const knex = require('../models/db');

const userLogin = async username => {
  const result = await knex
    .from('users')
    .select()
    .where({
      name: username
    });
  return result;
};

const userRegister = async (name, password, sex, age) => {
  const result = await knex.from('users').insert({
    name,
    password,
    sex,
    age
  });
  return result;
};

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
