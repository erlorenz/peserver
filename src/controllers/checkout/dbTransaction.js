import { transaction } from 'objection';
import CustomerOrder from '../../models/CustomerOrder';
import { DateTime } from 'luxon';

export default async payload => {
  let trx;

  const orderFields = { ...payload };

  // Format Timestamps into ISO for Postgres (turn string to number)
  orderFields.pickup_date = DateTime.fromMillis(+payload.pickup_date).toISO();
  orderFields.return_date = DateTime.fromMillis(+payload.return_date).toISO();

  console.log(orderFields.pickup_date);
  try {
    // Begin Transaction
    trx = await transaction.start(CustomerOrder.knex());

    await CustomerOrder.query(trx).insertGraph(orderFields);
    console.log('[transaction entered]');

    // Commit Transaction
    await trx.commit();
    console.log('[Transaction committed]');

    return {
      success: true,
      message: 'Successfully entered into database.',
    };
  } catch (e) {
    console.log('[NODE ERROR IN INSERT TO DB]', e);
    // Rollback transaction on error
    await trx.rollback();

    return {
      success: false,
      message: 'Error writing to database.',
    };
  }
};
