import adminCommentController from '../../controllers/adminComment';
import { checkAuth } from '../../utils';

export const Query = {
  async getAdminCommentsByOrderID(_, args, { models, currentUser }) {
    checkAuth(currentUser);

    const { customer_order_id, special_order_id } = args;

    // Search by either special order or order id
    const columnName = special_order_id
      ? 'special_order_id'
      : 'customer_order_id';

    const orderID = special_order_id ? special_order_id : customer_order_id;

    // Perform query
    const comments = await models.AdminCommentDisplay.query().where(
      columnName,
      orderID,
    );

    return comments;
  },
};

export const Mutation = {
  insertAdminComment: (_, args, context) =>
    adminCommentController(args, context),
};
