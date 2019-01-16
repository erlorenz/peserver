import { checkAuth } from '../../utils';
import specialOrderController from '../../controllers/specialOrder';

export const Query = {
  // Find Orders by Status
  async getSpecialOrdersByStatus(_, args, { currentUser, models }) {
    checkAuth(currentUser);

    const { status, orderBy = 'created_at', direction = 'desc' } = args;

    // Return all if no status included
    if (!status.length) return await models.SpecialOrder.query();

    const result = await models.SpecialOrder.query()
      .whereIn('status', status)
      .orderBy(orderBy, direction);

    return result;
  },

  async getSpecialOrder(_, args, { models, currentUser }) {
    const { id } = args;

    checkAuth(currentUser);

    const order = await models.SpecialOrder.query()
      .eager('[refunds, additionalCharges, adminComments]')
      .where('id', id)
      .first();

    // Throw error if no order found
    if (!order) throw new Error('No order found with this ID.');

    return order;
  },

  // Search orders by partial match
  //
  async getSpecialOrdersLike(_, { column, value }, { currentUser, models }) {
    checkAuth(currentUser);

    // Query DB
    const result = await models.SpecialOrder.query().where(
      column,
      'ilike',
      `%${value}%`,
    );

    // Throw error if no order found
    if (result.length === 0)
      throw new Error(`No orders found with ${column} of ${value}.`);

    return result;
  },
};

export const Mutation = {
  createSpecialOrder(_, args, context) {
    return specialOrderController(_, args, context);
  },
};
