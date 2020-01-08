const knex = require('../models/db');

const userLogin = async username => {
  const result = await knex
    .select()
    .from('users')
    .where({
      name: username
    });
  return result;
};

module.exports = {
  userLogin
};
