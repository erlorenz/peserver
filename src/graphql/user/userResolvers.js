import loginController from '../../controllers/login';
import registerController from '../../controllers/register';

export const Mutation = {
  login: (_, { email, password }) => loginController(email, password),

  register: (_, payload, { models }) =>
    registerController(payload, models.User),
};
