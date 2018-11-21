import mongoose from 'mongoose';
import generateJWT from './generateJWT';
import authRole from './authRole';
import login from './login';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      required: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
});

// Generate JWT Method
userSchema.methods.generateJWT = generateJWT;

// Authorizations
userSchema.methods.authRole = authRole;

// Login
userSchema.statics.login = login;

export default mongoose.model('User', userSchema);
