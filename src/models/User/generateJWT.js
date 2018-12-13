import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config/keys';

export default function() {
  const payload = { email: this.email };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
  return token;
}
