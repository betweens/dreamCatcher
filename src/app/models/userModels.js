const knex = require('../models/db');
let logger = require('../utils/logger');

logger = logger('models:userModelsjs');
const init = async () => {
  logger.info('初始化数据库错误如下:');
  try {
    const result = await knex.schema.createTable('users', table => {
      table.increments();
      table.string('name');
      table.string('password');
      table.integer('age');
      table.integer('sex');
      table.timestamps(true, true);
    });
    return result;
  } catch (error) {
    logger.error('初始化数据库错误如下:');
    logger.info(error);
  }
};

module.exports = init;
