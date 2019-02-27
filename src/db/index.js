import Knex from 'knex';
import { Model } from 'objection';
import AdminUser from '../models/AdminUser';
import winston from 'winston';

const { DB_NAME, DB_PASSWORD, DB_USER, DB_SOCKET_NAME } = process.env;

// Decide which Knex config to use based on NODE_ENV
let config = {
  client: 'pg',
  connection: {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
};

if (process.env.NODE_ENV === 'production')
  config = {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: `/cloudsql/${DB_SOCKET_NAME}`,
    },
  };

// Initialize Knex and Objection
export default async () => {
  const knex = Knex(config);

  Model.knex(knex);

  // Test if DB works by a simple request
  (async () => {
    try {
      await AdminUser.query();
      winston.info('Postgres Server Connected');
    } catch (e) {
      winston.warn('Postgres: ' + e.message);
    }
  })();
};
