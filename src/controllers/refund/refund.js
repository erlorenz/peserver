import * as StripeController from '../../services/stripe';
import validate from './refundValidation';
import insertRefund from './insertRefund';
import { checkAuth } from '../../utils';
import sendRefund from '../../services/mailjet/sendRefund';

export default async (payload, { models, currentUser }) => {
  checkAuth(currentUser);

  // Validate data
  validate(payload);

  // Make refund -- fails on error
  const refundResponse = await StripeController.createRefund(
    payload.amount,
    payload.stripe_charge,
  );

  // Send receipt email
  const mailjetData = {
    amount: (payload.amount / 100).toFixed(2),
    name: payload.name,
    email: payload.email,
  };

  const receiptResponse = await sendRefund(mailjetData);

  // Update database
  const refundDetails = {
    stripe_refund: refundResponse.id,
    amount: payload.amount,
    admin_user_id: payload.admin_user_id,
    customer_order_id: payload.customer_order_id,
    special_order_id: payload.special_order_id,
  };

  const dbResponse = await insertRefund(refundDetails, models);

  return { receiptEmail: receiptResponse, database: dbResponse };
};
