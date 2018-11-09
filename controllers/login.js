import bcrypt from 'bcryptjs';
import User from '../models/User';

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate
    if (!email || !password) throw new Error('Must fill in both fields');

    // ----------Check if user exists-----------------------
    const user = await User.findOne({ email });
    if (!user) throw new Error('Incorrect username/password');

    // -------Compare password to password in DB------------------
    const isMatch = await bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new Error('Incorrect password/username');

    // Generate JWT
    const token = user.generateJWT();
    return res.json({ token, userName: user.name, isAdmin: user.isAdmin });

    // ---------Error----------------------
  } catch (e) {
    return res.status(401).json({ message: e.message });
  }
};
