import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import configureWinston from './config/logging';
import apolloServer from './schema';
import winston from 'winston';
import initializeDB from './db';
import initializeRoutes from './routes';

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

// Server ping
app.get('/', (req, res) =>
  res.send('Server is running in env: ' + process.env.NODE_ENV),
);

// Routes
initializeRoutes(app);

// Connect server to PORT
const { PORT, NODE_ENV } = process.env;

app.listen(PORT, () => {
  winston.info(
    `Express running at: ${PORT}, 
    Environment: ${NODE_ENV},
    🚀 Server ready.`,
  );
});
