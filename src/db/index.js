import Knex from 'knex';
import { dbURI } from '../config/keys';
import { Model } from 'objection';

const config = {
  client: 'pg',
  connection: dbURI,
};

export default async () => {
  const knex = Knex(config);

  Model.knex(knex);
};
