import bcrypt from 'bcryptjs';
import validate from './registerValidation';
import { checkAuth } from '../../utils';

export default async (payload, AdminUser, currentUser) => {
  checkAuth(currentUser);

  validate(payload);

  const { access_level, email, password, name } = payload;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const result = await AdminUser.query().insert({
    email,
    password: hash,
    name,
    access_level,
  });

  return result;
};
