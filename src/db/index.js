import Knex from 'knex';
import { dbURI } from '../config/keys';
import { Model } from 'objection';
import AdminUser from '../models/AdminUser';
import winston from 'winston';
import knexConfig from '../../knexfile';

// Decide which Knex config to use based on Env
let config = knexConfig.development;
if (process.env.NODE_ENV === 'production') config = knexConfig.staging;

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
