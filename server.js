import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import morgan from 'morgan';
import config from 'config';
import connectToDB from './startup/db';
import routes from './startup/routes';
import error from './middleware/error';
import logger from './startup/logging';

const app = express();

// DB connection
connectToDB();

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
routes(app);

// Error handler
app.use(error);

// Connect server to port
const port = process.env.PORT || 3001;
app.listen(port, () =>
  logger.info(
    `Express running... port: ${port}, Environment: ${config.get(
      'environment',
    )}`,
  ),
);
