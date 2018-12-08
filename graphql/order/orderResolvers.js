import { checkAuth } from '../../utils';
import { UserInputError } from 'apollo-server-express';

export const Query = {
  // Find Orders by Status
  async ordersByStatus(_, { status }, { user, models }) {
    // Check for user in context
    checkAuth(user);

    // Return all if no status included
    if (!status) return await models.Order.find();

    const result = await models.Order.find({
      status: {
        $in: status,
      },
    });

    return result;
  },

  // Find Individual Order by ID
  async orderById(_, { _id }, { user, models }) {
    checkAuth(user);

    const result = await models.Order.findById(_id);

    // Throw error if no order found
    if (!result) throw new UserInputError('No order found with this ID.');

    return result;
  },

  // Find Individual Order by email
  async orderByInput(_, { input }, { user, models }) {
    checkAuth(user);

    const result = await models.Order.find({ [input.type]: input.value });

    // Throw error if no order found
    if (result.length === 0)
      throw new UserInputError(
        `No order found with ${input.type} : ${input.value}.`,
      );

    return result;
  },
};
