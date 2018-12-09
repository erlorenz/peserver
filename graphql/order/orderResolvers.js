import { checkAuth } from '../../utils';
import { UserInputError } from 'apollo-server-express';
import checkoutController from '../../controllers/checkout';

export const Query = {
  //
  // Find Orders by Status
  //
  async ordersByStatus(_, { status }, { user, models }) {
    // Check for user in context
    checkAuth(user);

    // Return all if no status included
    if (!status) return await models.Order.find().sort({ _id: -1 });

    const result = await models.Order.find({
      status: {
        $in: status,
      },
    }).sort({ _id: -1 });

    // Throw error if no order found
    if (result.length === 0)
      throw new UserInputError(
        `No orders found with the queried status/statuses.`,
      );

    return result;
  },

  //
  // Find Individual Order by ID
  //
  async orderById(_, { _id }, { user, models }) {
    checkAuth(user);

    const result = await models.Order.findById(_id);

    // Throw error if no order found
    if (!result) throw new UserInputError('No order found with this ID.');

    return result;
  },

  //
  // Search orders by exact or partial match
  //
  async ordersMatch(_, { input }, { user, models }) {
    checkAuth(user);

    // Validate that the fields are filled out
    if (!input.field || !input.value || !input.matchType)
      throw new UserInputError('Missing field, value, or match type');

    // Decide whether to do an exact or partial search, default = exact
    let searchTerm = input.value;

    if (input.matchType === 'PARTIAL')
      searchTerm = new RegExp(input.value, 'i');

    // Query DB
    const result = await models.Order.find({
      [input.field]: searchTerm,
    }).sort({ _id: -1 });

    // Throw error if no order found
    if (result.length === 0)
      throw new UserInputError(
        `No orders found with ${input.field} of ${input.value}.`,
      );

    return result;
  },
};

export const Mutation = {
  checkout: async (_, { payload }) => {
    return await checkoutController(payload);
  },
};
