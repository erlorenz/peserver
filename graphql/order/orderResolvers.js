import Order from '../../models/Order';
import { checkAuth } from '../../utils';

export const Query = {
  // Find Orders by Status
  async ordersByStatus(_, { status }, { user }) {
    checkAuth(user);

    // Return all if no status included
    if (!status) return await Order.find();

    const result = await Order.find({
      status: {
        $in: status,
      },
    });

    return result;
  },

  // Find Individual Order by ID or Name
  async orderById(_, { _id }, { user }) {
    checkAuth(user);

    const result = await Order.findById(_id);
    return result;
  },

  async orderByEmail(_, { email }, { user }) {
    checkAuth(user);

    const result = await Order.find({ email });
    return result;
  },
};
