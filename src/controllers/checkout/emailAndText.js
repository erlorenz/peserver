import TextAPI from '../../services/twilio';
import { textBody } from '../../services/twilio/messages';
import sendReceipt from '../../services/mailjet/sendReceipt';
import { DateTime } from 'luxon';

export default async payload => {
  const orderFields = { ...payload };

  // Send mailjet email

  const addSubtotal = orderFields.customerOrderItems.map(item => ({
    ...item,
    subTotal: ((item.price * item.quantity) / 100).toFixed(2),
  }));

  const emailPayload = {
    phone: orderFields.phone,
    name: orderFields.name,
    email: orderFields.email,
    hotel: orderFields.hotel,
    room: orderFields.room,
    pickup_date: DateTime.fromMillis(+orderFields.pickup_date)
      .setZone('America/Los_Angeles')
      .toFormat('EEEE, M/d h:mm a'),

    return_date: DateTime.fromMillis(+orderFields.return_date)
      .setZone('America/Los_Angeles')
      .toFormat('EEEE, M/d h:mm a'),
    customerOrderItems: addSubtotal,
    total_price: (orderFields.total_price / 100).toFixed(2),
  };
  const receiptResponse = await sendReceipt(emailPayload);

  // // Send twilio text message
  const textResponse = await TextAPI(textBody.processed, orderFields.phone);

  return { receiptResponse, textResponse };
};
