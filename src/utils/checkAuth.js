import { AuthenticationError } from 'apollo-server-express';

export default user => {
  if (!user) throw new AuthenticationError('Invalid token');
  return user;
};
