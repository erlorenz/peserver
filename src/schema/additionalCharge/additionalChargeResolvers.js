import additionalChargeController from '../../controllers/additionalCharge';
import { checkAuth } from '../../utils';

export const Query = {
  async getAdditionalChargesByOrderID(_, payload, { models, currentUser }) {
    checkAuth(currentUser);

    const { customer_order_id, special_order_id } = payload;

    // Search by either special order or order id
    const columnName = special_order_id
      ? 'special_order_id'
      : 'customer_order_id';

    const orderID = special_order_id ? special_order_id : customer_order_id;

    // Perform query
    const charges = await models.AdditionalCharge.query().where(
      columnName,
      orderID,
    );
    return charges;
  },
};

export const Mutation = {
  insertAdditionalCharge: (_, args, context) =>
    additionalChargeController(args, context),
};
