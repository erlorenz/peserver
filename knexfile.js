// Update with your config settings.
require('dotenv').config();

const { DB_NAME, DB_PASSWORD, DB_USER, DB_SOCKET_NAME } = process.env;

module.exports = {
  staging: {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: `/cloudsql/${DB_SOCKET_NAME}`,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  development: {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: `/cloudsql/${DB_SOCKET_NAME}`,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
