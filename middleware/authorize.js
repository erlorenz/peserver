import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/keys';

export default (req, res, next) => {
  // Extract token
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
