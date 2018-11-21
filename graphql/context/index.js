import { User, Order, SpecialOrder } from '../../models';
import verifyToken from './verifyToken';

export default async ({ req }) => {
  // Add Models to Context
  const models = { User, Order, SpecialOrder };

  // Verify token
  try {
    const user = await verifyToken(req, User);
    console.log('user:', user);

    return { user, models };
  } catch (e) {
    return;
  }
};
