import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import morgan from 'morgan';
import config from 'config';
import connectToDB from './db/connect';
import checkout from './routes/checkout';
import admin from './routes/admin';
import auth from './routes/auth';
import orderForm from './routes/orderForm';
import strategy from './config/passport';

const app = express();

// DB connection
connectToDB();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

// Configuration
console.log(`Environment: ${config.get('environment')}`);

// Passport
passport.use(strategy);
const nosession = { session: false };

// Use routes
app.use('/checkout', checkout);
app.use('/admin', passport.authenticate('jwt', nosession), admin);
app.use('/orderform', passport.authenticate('jwt', nosession), orderForm);
app.use('/auth', auth);

// Errors

// Basic root route
app.get('/', (req, res) => res.send('Server is running'));

// Connect server to port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Express is on port ${port}!`));
