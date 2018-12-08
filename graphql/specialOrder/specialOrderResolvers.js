import { checkAuth } from '../../utils';
import { UserInputError } from 'apollo-server-express';

export const Query = {
  // Find Orders by Status
  async specialOrdersByStatus(_, { status }, { user, models }) {
    checkAuth(user);

    // Return all if no status included
    if (!status) return await models.SpecialOrder.find();

    const result = await models.SpecialOrder.find({
      status: {
        $in: status,
      },
    });

    return result;
  },

  // Find Individual Order by ID
  async specialOrderById(_, { _id }, { user, models }) {
    checkAuth(user);

    const result = await models.SpecialOrder.findById(_id);

    // Throw error if no order found
    if (!result) throw new UserInputError('No order found with this ID');

    return result;
  },

  // Find Individual Order by email
  async specialOrderByEmail(_, { email }, { user, models }) {
    checkAuth(user);

    const result = await models.SpecialOrder.find({ email });

    // Throw error if no order found
    if (result.length === 0)
      throw new UserInputError('No order found with this email');

    return result;
  },
};
