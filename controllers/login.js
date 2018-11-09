import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { jwtSecret } from '../config/keys';

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate
    if (!email || !password) throw new Error('Must fill in both fields');

    // ----------Check if user exists-----------------------
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error('Incorrect username/password');

    // -------Compare password to password in DB------------------
    const isMatch = await bcrypt.compareSync(password, existingUser.password);
    if (!isMatch) throw new Error('Incorrect password/username');

    // ------------Sign JWT and return it-------------------
    const payload = { email };
    const createToken = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
    return res.json({ token: createToken, userName: existingUser.name });

    // ---------Error----------------------
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};
