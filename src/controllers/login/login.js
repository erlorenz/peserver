import bcrypt from 'bcryptjs';
import {
  AuthenticationError,
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

export default async (email, password, User) => {
  try {
    // Validate
    if (!email || !password)
      throw new UserInputError('Username/password can not be blank');

    // Check if user exists
    const user = await User.query()
      .where({ email })
      .first();
    if (!user) throw new AuthenticationError('Incorrect username/password');

    // Compare password to password in DB
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new AuthenticationError('Incorrect password/username');

    // Generate JWT
    const token = user.generateJWT();

    return {
      token,
      name: user.name,
      roles: user.roles,
      password: user.password,
    };
  } catch (e) {
    throw new ApolloError(e);
  }
};
