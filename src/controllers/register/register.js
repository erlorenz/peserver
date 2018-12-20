import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';

export default async ({ role, email, password, name }, AdminUser) => {
  if (!role || !email || !password || !name)
    throw new UserInputError('Missing information!');
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const result = await AdminUser.query().insert({
    email,
    password: hash,
    name,
    role,
  });

  return result;
};
