import mongoose from 'mongoose';
import { dbURI } from '../config/keys';
import winston from 'winston';
import Knex from 'knex';
import { Model } from 'objection';

export default async () => {
  try {
    await mongoose.connect(
      dbURI,
      { useNewUrlParser: true },
    );
    winston.info('mlab mongodb connected');
  } catch (err) {
    winston.error('couldnt connect to mongodb');
  }
};

const knex = Knex({
  client: 'pg',
  connection: dbURI,
});

Model.knex(knex);
