import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import configureWinston from './config/logging';
import apolloServer from './schema';
import winston from 'winston';
import initializeDB from './db';

// Initialize express
const app = express();

// Logging
configureWinston();

// Initialize Database and Objection
initializeDB();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// GraphQL
apolloServer.applyMiddleware({ app });

// Connect server to port
const port = process.env.PORT;
app.listen(port, () => {
  winston.info(
    `Express running at: ${port}, 
    Environment: ${process.env.NODE_ENV},
    🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`,
  );
});
