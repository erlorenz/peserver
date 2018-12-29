import Knex from 'knex';
import { dbURI } from '../config/keys';
import { Model } from 'objection';
import AdminUser from '../models/AdminUser';
import winston from 'winston';

const config = {
  client: 'pg',
  connection: dbURI,
};

export default async () => {
  const knex = Knex(config);

  Model.knex(knex);

  (async () => {
    try {
      await AdminUser.query();
      winston.info('Postgres Server Connected');
    } catch (e) {
      winston.warn('Postgres: ' + e.message);
    }
  })();
};
