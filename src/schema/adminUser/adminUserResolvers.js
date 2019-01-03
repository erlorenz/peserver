import signInController from '../../controllers/signIn';
import registerController from '../../controllers/register';
import { checkAuth } from '../../utils';

export const Query = {
  checkToken: (_, args, { currentUser }) => {
    checkAuth(currentUser);
    return currentUser;
  },
};

export const Mutation = {
  signIn: (_, { email, password }, { models }) =>
    signInController(email, password, models.AdminUser),

  register: (_, payload, { models, currentUser }) =>
    registerController(payload, models.AdminUser, currentUser),
};
