import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config/keys';

export default function() {
  const payload = { _id: this._id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
  return token;
}
