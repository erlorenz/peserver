import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from 'config';
import connectToDB from './startup/db';
import configureWinston from './startup/logging';
import apolloServer from './graphql/schema';

import winston from 'winston';

const app = express();

// Logging
configureWinston();

// DB connection
connectToDB();

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
    `Express running... port: ${port}, Environment: ${config.get(
      'environment',
    )},
    🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`,
  );
});
