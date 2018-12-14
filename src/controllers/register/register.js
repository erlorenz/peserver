import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

export default async ({ roles, email, password, name }, User) => {
  if (!roles || !email || !password || !name)
    throw new UserInputError('Missing information!');
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const result = await User.query().insert({
    email,
    password: hash,
    name,
    roles,
  });

  return result;
};
