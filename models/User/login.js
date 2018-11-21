import bcrypt from 'bcryptjs';
import {
  AuthenticationError,
  UserInputError,
  ApolloError,
} from 'apollo-server-express';

export default async function(email, password) {
  try {
    // Validate
    if (!email || !password)
      throw new UserInputError('Username/password can not be blank');

    // ----------Check if user exists-----------------------
    const user = await this.findOne({ email });
    if (!user) throw new AuthenticationError('Incorrect username/password');

    // -------Compare password to password in DB------------------
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new AuthenticationError('Incorrect password/username');

    // Generate JWT
    const token = user.generateJWT();

    return { token, name: user.name, roles: user.roles };
  } catch (e) {
    throw new ApolloError(e);
  }
}
