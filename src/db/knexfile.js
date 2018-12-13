import { dbHost, dbName, dbPassword, dbUser } from '../config/keys';

export default {
  client: 'pg',
  connection: {
    database: dbName,
    user: dbUser,
    password: dbPassword,
    host: dbHost,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
