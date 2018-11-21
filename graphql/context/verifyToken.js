import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config/keys';

export default async (req, User) => {
  // Extract token
  const token = req.header('x-auth-token') || '';
  if (!token) return null;

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded._id);
    return user;
  } catch (e) {
    return null;
  }
};
