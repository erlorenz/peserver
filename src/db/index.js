import Knex from 'knex';
import { dbHost, dbName, dbPassword, dbUser } from '../config/keys';
import { Model } from 'objection';

const config = {
  client: 'pg',
  connection: {
    database: dbName,
    user: dbUser,
    password: dbPassword,
    host: dbHost,
  },
};

export default async () => {
  const knex = Knex(config);

  Model.knex(knex);
};
