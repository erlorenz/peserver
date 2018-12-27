import loginController from '../../controllers/login';
import registerController from '../../controllers/register';

export const Mutation = {
  login: (_, { email, password }, { models }) =>
    loginController(email, password, models.AdminUser),

  register: (_, payload, { models, currentUser }) =>
    registerController(payload, models.AdminUser, currentUser),
};
