import AdminUser from '../../models/AdminUser';
import CustomerOrder from '../../models/CustomerOrder';
import CustomerOrderItem from '../../models/CustomerOrderItem';
import SpecialOrder from '../../models/SpecialOrder';
import AdminComment from '../../models/AdminComment';
import AdminCommentDisplay from '../../models/AdminCommentDisplay';
import AdditionalCharge from '../../models/AdditionalCharge';
import Refund from '../../models/Refund';

import verifyToken from './verifyToken';

export default async ({ req }) => {
  const context = {
    // Add Models to Context
    models: {
      AdminUser,
      CustomerOrder,
      SpecialOrder,
      CustomerOrderItem,
      AdminComment,
      AdminCommentDisplay,
      AdditionalCharge,
      Refund,
    },

    // User defaults to null
    user: null,
  };

  // Verify token
  try {
    const user = await verifyToken(req, AdminUser);

    // Add the verified user to the context
    context.user = user;
  } catch (e) {
    console.log('context: No token match');
  }

  return context;
};
