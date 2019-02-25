import { transaction } from 'objection';
import CustomerOrder from '../../models/CustomerOrder';

export default async payload => {
  let trx;
  try {
    // Begin Transaction
    trx = await transaction.start(CustomerOrder.knex());

    await CustomerOrder.query(trx).insertGraph(payload);
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
