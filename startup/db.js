import mongoose from 'mongoose';
import { dbURI } from '../config/keys';
import winston from 'winston';

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI);
    winston.info('mlab mongodb connected');
  } catch (err) {
    winston.error('couldnt connect to mongodb');
  }
};

export default connectToDB;
