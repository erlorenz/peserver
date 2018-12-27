import adminCommentController from '../../controllers/adminComment';

export const Query = {
  async getAdminCommentsByOrderID(_, payload, { models }) {
    // Deconstruct
    const { customer_order_id, special_order_id } = payload;

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
  insertAdminComment: (_, { payload }, { models }) =>
    adminCommentController(payload, models.AdminComment),
};
