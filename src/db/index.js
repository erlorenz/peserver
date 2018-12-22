import Knex from 'knex';
import { dbURI } from '../config/keys';
import winston from 'winston';

const knex = Knex({
  connection: dbURI,
  client: 'pg',
});

export const dbTest = async () => {
  try {
    await knex.queryBuilder().select(knex.raw('now()'));
    winston.info('Postgres database connected.');
  } catch (e) {
    winston.warn('Postgres database not connected');
  }
};

export default knex;
