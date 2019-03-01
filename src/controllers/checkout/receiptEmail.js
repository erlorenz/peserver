import sendReceipt from '../../services/mailjet/sendReceipt';
import { DateTime } from 'luxon';

const receiptEmail = async payload => {
  const orderFields = { ...payload };

  // Format the prices
  const addSubtotal = orderFields.customerOrderItems.map(item => ({
    ...item,
    subTotal: ((item.price * item.quantity) / 100).toFixed(2),
  }));
  const total_price = (orderFields.total_price / 100).toFixed(2);

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
    total_price,
  };
  const receiptResponse = await sendReceipt(emailPayload);

  return receiptResponse;
};

export default receiptEmail;
