import mongoose from 'mongoose';
import { dbURI } from '../config/keys';
import logger from './logging';

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI);
    logger.info('mlab mongodb connected');
  } catch (err) {
    logger.error('couldnt connect to mongodb');
  }
};

export default connectToDB;
