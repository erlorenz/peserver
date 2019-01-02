import loginController from '../../controllers/login';
import registerController from '../../controllers/register';
import { checkAuth } from '../../utils';

export const Query = {
  checkToken: (_, args, { currentUser }) => {
    checkAuth(currentUser);
    return { success: true, message: 'User authenticated' };
  },
};

export const Mutation = {
  login: (_, { email, password }, { models }) =>
    loginController(email, password, models.AdminUser),

  register: (_, payload, { models, currentUser }) =>
    registerController(payload, models.AdminUser, currentUser),
};
