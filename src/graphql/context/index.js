import User from '../../models/User';
import Order from '../../models/Order';
import OrderItem from '../../models/OrderItem';
import SpecialOrder from '../../models/SpecialOrder';
import AdminComment from '../../models/AdminComment';
import AdditionalCharge from '../../models/AdditionalCharge';
import Refund from '../../models/Refund';

import verifyToken from './verifyToken';

export default async ({ req }) => {
  const context = {
    // Add Models to Context
    models: { User, Order, SpecialOrder },

    // User defaults to null
    user: null,
  };

  // Verify token
  try {
    const user = await verifyToken(req, User);

    // Add the verified user to the context
    context.user = user;
    console.log('context: user:', user);
  } catch (e) {
    console.log('context: No token match');
  }

  return context;
};
