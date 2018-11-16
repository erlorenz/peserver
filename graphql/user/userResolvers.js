import loginController from './loginController';

export const Mutation = {
  login: (_, { email, password }) => loginController(email, password),
};
