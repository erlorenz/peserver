import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config/keys';

export default async (req, AdminUser) => {
  // Extract token
  const token = req.header('x-auth-token') || '';
  if (!token) throw new Error('No token in header');

  // Verify token
  const decoded = jwt.verify(token, jwtSecret);
  const user = await AdminUser.query()
    .where('email', decoded.email)
    .first();

  if (!user) throw new Error('Unauthorized');
  delete user.password;

  return user;
};
