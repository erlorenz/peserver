import { checkAuth } from '../../utils';
import { UserInputError } from 'apollo-server-express';
import checkoutController from '../../controllers/checkout';
import changeStatusController from '../../controllers/changeStatus';

export const Query = {
  //
  // Find Orders by Status
  //
  async getOrdersByStatus(_, { status }, { user, models }) {
    // Check for user in context
    checkAuth(user);

    // Return all if no status included
    if (!status) return await models.CustomerOrder.query();

    const result = await models.CustomerOrder.query().whereIn('status', status);

    // Throw error if no order found
    if (!result.length)
      throw new UserInputError(
        `No orders found with the queried status/statuses.`,
      );

    return result;
  },

  //
  // Find Individual Order by ID including comments
  //
  async getAllOrderDetails(_, { customer_order_id }, { models }) {
    // checkAuth(user);

    const orderAndComments = await models.CustomerOrder.query()
      .where('id', customer_order_id)
      .eager([
        'adminComments',
        'refunds',
        'additionalCharges',
        'customerOrderItems',
      ])
      .first();

    console.log('OAC', orderAndComments);
    // Throw error if no order found
    if (!orderAndComments)
      throw new UserInputError('No order found with this ID.');

    return orderAndComments;
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
  checkout(_, { payload }) {
    return checkoutController(payload);
  },

  orderChangeStatus: (_, { status, id }, { models }) =>
    changeStatusController(status, id, models.Order),
};
