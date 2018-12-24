import additionalChargeController from '../../controllers/additionalCharge';

export const Query = {
  async getAdditionalChargesByOrderID(_, args, { models }) {
    // Validate
    if (!args.customer_order_id && !args.special_order_id)
      throw new Error('Missing order ID');

    // Search by either special order or order id
    let additionalCharges;
    try {
      if (args.special_order_id) {
        additionalCharges = await models.Refund.query().where(
          'special_order_id',
          args.special_order_id,
        );
      } else {
        additionalCharges = await models.Refund.query().where(
          'customer_order_id',
          args.customer_order_id,
        );
      }
      console.log(additionalCharges);

      return additionalCharges;
    } catch (e) {
      console.log(e);
    }
  },
};

export const Mutation = {
  insertRefund: (_, { payload }, { models }) =>
    additionalChargeController(payload, models.Refund),
};
