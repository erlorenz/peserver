import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import { jwtSecret } from '../config/keys';

// -----------Set Options---------
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

// -------------Set Verify----------
const verify = async (payload, done) => {
  const { email } = payload;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return done(null, false);
    }
    return done(null, existingUser);
  } catch (e) {
    return done(e, false);
  }
};

// ------------Create strategy for export----------

export default new JWTStrategy(options, verify);
