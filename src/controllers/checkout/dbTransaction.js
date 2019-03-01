import { transaction } from 'objection';
import CustomerOrder from '../../models/CustomerOrder';
import { DateTime } from 'luxon';

export default async payload => {
  let trx;

  // Format Timestamps into ISO for Postgres (turn string to number)
  payload.pickup_date = DateTime.fromMillis(+payload.pickup_date).toISO();
  payload.return_date = DateTime.fromMillis(+payload.return_date).toISO();

  try {
    // Begin Transaction
    trx = await transaction.start(CustomerOrder.knex());

    await CustomerOrder.query(trx).insertGraph(payload);

    // Commit Transaction
    await trx.commit();

    return {
      success: true,
      message: 'Successfully entered into database.',
    };
  } catch (e) {
    // Rollback transaction on error
    await trx.rollback();
    console.log(e);
    return {
      success: false,
      message: 'Error writing to database.',
    };
  }
};
