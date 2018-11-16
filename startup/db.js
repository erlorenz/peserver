import mongoose from 'mongoose';
import { dbURI } from '../config/keys';
import winston from 'winston';

export default async () => {
  try {
    await mongoose.connect(dbURI);
    winston.info('mlab mongodb connected');
  } catch (err) {
    winston.error('couldnt connect to mongodb');
  }
};
