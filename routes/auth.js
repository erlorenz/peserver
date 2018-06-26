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

    // -------Compare password to password in DB------------------
    const isMatch = await bcrypt.compare(password, existingUser.password);

    // --------Match not found ------------------------------
    if (!isMatch) {
      throw new Error();
    }
    // ------------Sign JWT and return it-------------------
    const payload = { email };
    const createToken = jwt.sign(payload, jwtSecret, { expiresIn: 3600 });
    const token = `Bearer ${createToken}`;
    return res.json({ token });

    // ---------Error----------------------
  } catch (e) {
    return res.status(400).json({ errorMsg: 'Email/password not found' });
  }
});

export default router;
