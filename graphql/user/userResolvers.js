export const Mutation = {
  login: (_, { email, password }, { models }) =>
    models.User.login(email, password),
};
