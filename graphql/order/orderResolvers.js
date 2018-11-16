import Order from '../../models/Order';

export const Query = {
  // Find Orders by Status
  async ordersByStatus(_, { status }) {
    //
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
  async orderById(_, { _id }) {
    const result = await Order.findById(_id);
    return result;
  },

  async orderByEmail(_, { email }) {
    const result = await Order.find({ email });
    return result;
  },
};
