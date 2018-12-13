import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import morgan from 'morgan';
import configureWinston from './config/logging';
import apolloServer from './graphql/schema';
import winston from 'winston';
import { Model } from 'objection';
import knex from './db';

// Initialize express
const app = express();

// DB
Model.knex(knex);

// Logging
configureWinston();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// GraphQL
apolloServer.applyMiddleware({ app });

// Connect server to port
const port = process.env.PORT || 3001;
app.listen(port, () => {
  winston.info(
    `Express running... port: ${port}, Environment: ${process.env.NODE_ENV},
    )},
    🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`,
  );
});
