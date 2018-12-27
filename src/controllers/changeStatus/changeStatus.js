import { textBody, textArray } from '../../services/twilio/messages';
import textAPI from '../../services/twilio';
import statusList from './statusList';
import { checkAuth } from '../../utils';

export default async (args, { models, currentUser }) => {
  checkAuth(currentUser);

  const { status, customer_order_id, special_order_id } = args;
  const { SpecialOrder, CustomerOrder } = models;

  if (!statusList.includes(status)) throw new Error('Invalid status');

  // Decide which model to use
  const Model = special_order_id ? SpecialOrder : CustomerOrder;
  const id = special_order_id ? special_order_id : customer_order_id;

  const order = await Model.query()
    .patch({ status })
    .where({ id })
    .returning('*')
    .first();

  const dbResponse = { success: true, message: order.id };

  //  Send twilio message if it is a matching status
  if (textArray.includes(status) && customer_order_id) {
    const textResponse = await textAPI(textBody[status], order.phone);

    return {
      database: dbResponse,
      twilio: textResponse,
    };
  }

  // No text needed to be sent
  return {
    database: dbResponse,
    twilio: { success: false, message: 'No text needed to be sent' },
  };
};
