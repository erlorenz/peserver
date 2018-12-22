import { transaction } from 'objection';
import CustomerOrder from '../../models/CustomerOrder';

export default async payload => {
  // const { customerOrderItems, ...customerOrderData } = payload;

  let trx;
  try {
    // Begin Transaction
    trx = await transaction.start(CustomerOrder.knex());

    const order = await CustomerOrder.query(trx).insertGraph(payload);

    // Commit Transaction
    await trx.commit();

    return {
      success: true,
      message: order.id,
    };
  } catch (e) {
    // Rollback transaction on error
    await trx.rollback();

    return {
      success: false,
      message: e.message,
    };
  }
};
