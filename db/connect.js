import mongoose from 'mongoose';
import { dbURI } from '../config/keys';

const connectToDB = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('mlab mongodb connected');
  } catch (err) {
    console.log('couldnt connect to mongodb');
  }
};

export default connectToDB;
