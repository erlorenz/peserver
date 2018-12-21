import { transaction } from 'objection';
import CustomerOrder from '../../models/CustomerOrder';

// Get knex from any model
const knex = CustomerOrder.knex();
export default async payload => {
  // Extract CartItems
  const { cartItems, ...orderData } = payload;

  // Begin Transaction
  try {
    // eslint:

    const order = await transaction(knex, async trx => {
      const order = await CustomerOrder.query(trx).insert(orderData);

      const items = await order
        .$relatedQuery('order_item', trx)
        .insert(cartItems);

      console.log('Order:', order, ' ---- Items:', items);

      return order;
    });
    return {
      success: true,
      message: order.id,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: e.message,
    };
  }
};
