import refundController from '../../controllers/refund';

export const Query = {
  async getRefundsByOrderID(_, args, { models }) {
    // Validate
    if (!args.customer_order_id && !args.special_order_id)
      throw new Error('Missing order ID');

    // Search by either special order or order id
    let refunds;
    try {
      if (args.special_order_id) {
        refunds = await models.Refund.query().where(
          'special_order_id',
          args.special_order_id,
        );
      } else {
        refunds = await models.Refund.query().where(
          'customer_order_id',
          args.customer_order_id,
        );
      }
      console.log(refunds);

      return refunds;
    } catch (e) {
      console.log(e);
    }
  },
};

export const Mutation = {
  insertRefund: (_, { payload }, { models }) =>
    refundController(payload, models.Refund),
};
