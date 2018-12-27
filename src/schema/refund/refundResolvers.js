import refundController from '../../controllers/refund';
import { checkAuth } from '../../utils';

export const Query = {
  async getRefundsByOrderID(_, args, { models, currentUser }) {
    checkAuth(currentUser);

    const { customer_order_id, special_order_id } = args;

    // Search by either special order or order id
    const columnName = special_order_id
      ? 'special_order_id'
      : 'customer_order_id';

    const orderID = special_order_id ? special_order_id : customer_order_id;

    // Perform query
    const charges = await models.Refund.query().where(columnName, orderID);
    return charges;
  },
};

export const Mutation = {
  insertRefund: (_, args, context) => refundController(args, context),
};
