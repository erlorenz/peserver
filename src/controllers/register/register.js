import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

export default async ({ access_level, email, password, name }, User) => {
  if (!access_level || !email || !password || !name)
    throw new UserInputError('Missing information!');

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const result = await User.query().insert({
    email,
    password: hash,
    name,
    access_level,
  });

  console.log(result);

  return result;
};
