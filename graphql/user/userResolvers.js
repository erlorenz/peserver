import User from '../../models/User';

export const Mutation = {
  login: (_, { email, password }) => User.login(email, password),
};
