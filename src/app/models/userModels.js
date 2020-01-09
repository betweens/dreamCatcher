const knex = require('../models/db');

knex.schema.createTable('users', table => {
  table.increments();
  table.string('name');
  table.string('password');
  table.integer('age');
  table.integer('sex');
  table.timestamps(true, true);
});
