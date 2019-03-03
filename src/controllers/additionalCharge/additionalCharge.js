import * as StripeController from '../../services/stripe';
import validate from './additionalChargeValidation';
import insertAdditionalCharge from './insertAdditionalCharge';
import { checkAuth } from '../../utils';
import sendAdditionalCharge from '../../services/mailjet/sendAdditionalCharge';

export default async (payload, { models, currentUser }) => {
  checkAuth(currentUser);

  // Create data object
  const {
    amount,
    admin_user_id,
    customer_order_id,
    stripe_customer,
    name,
    email,
    special_order_id,
  } = payload;

  // Validate additional data -- fails on error
  validate(payload);

  // Make additional charge -- fails on error
  const charge = await StripeController.createCharge(amount, stripe_customer);

  // Send receipt email
  const mailjetData = {
    name: name,
    email: email,
    amount: (amount / 100).toFixed(2),
  };

  // const emailResponse = await EmailController.additionalEmail(mailjetData);
  const emailResponse = await sendAdditionalCharge(mailjetData);

  const additionalDetails = {
    stripe_charge: charge.id,
    amount,
    admin_user_id: admin_user_id,
    customer_order_id,
    special_order_id,
  };

  // Save to DB
  const dbResponse = await insertAdditionalCharge(
    additionalDetails,
    models.AdditionalCharge,
  );

  return { receiptEmail: emailResponse, database: dbResponse };
};
