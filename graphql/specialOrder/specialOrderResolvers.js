import SpecialOrder from '../../models/SpecialOrder';

export const Query = {
  // Find Orders by Status
  async specialOrdersByStatus(_, { status }) {
    //
    // Return all if no status included
    if (!status) return await SpecialOrder.find();

    const result = await SpecialOrder.find({
      status: {
        $in: status,
      },
    });

    return result;
  },
  // Find Individual Order by ID or Name
  async specialOrderById(_, { _id }) {
    const result = await SpecialOrder.findById(_id);
    return result;
  },
};
