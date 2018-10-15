import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
// whats the deal
import { jwtSecret } from '../config/keys';

const router = new Router();

// --------------------Log In--------------------------------
//
//
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // ----------Check if user exists-----------------------
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    // -------Compare password to password in DB------------------
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      throw new Error('Password is incorrect');
    }

    // ------------Sign JWT and return it-------------------
    const payload = { email };
    const createToken = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
    const token = `Bearer ${createToken}`;
    return res.json({ token, userName: existingUser.name });

    // ---------Error----------------------
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
});

export default router;
