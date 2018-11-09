import mongoose from 'mongoose';
import { jwtSecret } from '../config/keys';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Generate JWT Method
userSchema.methods.generateJWT = function() {
  const payload = { _id: this._id, isAdmin: this.isAdmin };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
  return token;
};

export default mongoose.model('User', userSchema);
