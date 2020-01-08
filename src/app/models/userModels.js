const knex = require('../models/db');

knex.schema.createTable('users', table => {
  table.increments();
  table.string('name');
  table.integer('age');
  table.timestamps();
});
