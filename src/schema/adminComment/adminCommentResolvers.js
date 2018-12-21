import adminCommentController from '../../controllers/adminComment';
import { UserInputError } from 'apollo-server-express';

export const Query = {
  async getAdminCommentsByOrder(_, args, { models }) {
    // Validate
    if (!args.customer_order_id && !args.special_order_id)
      throw new UserInputError('Missing order ID');

    // Search by either special order or order id
    let comments;
    try {
      if (args.special_order_id) {
        comments = await models.AdminComment.query().where(
          'special_order_id',
          args.special_order_id,
        );
      } else {
        comments = await models.AdminComment.query().where(
          'customer_order_id',
          args.customer_order_id,
        );
      }
      console.log(comments);

      return comments;
    } catch (e) {
      console.log(e);
    }
  },
};

export const Mutation = {
  insertAdminComment: (_, { payload }, { models }) =>
    adminCommentController(payload, models.AdminComment),
};
