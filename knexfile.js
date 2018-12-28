require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: process.env.DB_URI,
  migrations: {
    tableName: 'knex_migrations',
  },
};
