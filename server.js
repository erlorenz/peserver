import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import config from 'config';
import connectToDB from './db/connect';
import checkout from './routes/checkout';
import admin from './routes/admin';
import auth from './routes/auth';
import customOrder from './routes/customOrder';
import strategy from './config/passport';

const app = express();

// DB connection
connectToDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());

// Configuration
console.log(`Environment: ${config.get('environment')}`);

// Passport strategy
passport.use(strategy);

// Use routes
app.use('/checkout', checkout);
app.use('/admin', passport.authenticate('jwt', { session: false }), admin);
app.use('/auth', auth);
app.use('/customOrder', customOrder);
// Basic root route
app.get('/', (req, res) => res.send('working'));
// Connect server to port
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Express is on port ${port}!`));
