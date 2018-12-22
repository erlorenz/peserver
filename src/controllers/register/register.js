import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import validate from './registerValidation';

export default async (payload, User) => {
  validate(payload);

  const { access_level, email, password, name } = payload;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const result = await User.query().insert({
    email,
    password: hash,
    name,
    access_level,
  });

  return result;
};
