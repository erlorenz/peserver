import * as EmailController from '../../services/mailjet';
import * as StripeController from '../../services/stripe';
import validate from './additionalChargeValidation';
import insertAdditionalCharge from './insertAdditionalCharge';

export default async (payload, AdditionalCharge) => {
  // Create data object
  const {
    description,
    amount,
    admin_user_id,
    customer_order_id,
    stripe_customer,
    name,
    email,
    special_order_id,
  } = payload;
  try {
    // Validate additional data -- fails on error
    validate(payload);

    // Create metadata object
    const metadata = { description };

    // Make additional charge -- fails on error
    const charge = await StripeController.createCharge(
      amount,
      stripe_customer,
      metadata,
    );

    // Send receipt email
    const mailjetData = {
      name: name,
      email: email,
      additionalAmount: amount,
      additionalDescription: description,
    };

    const emailResponse = EmailController.additionalEmail(mailjetData);

    const additionalDetails = {
      stripe_charge: charge.id,
      amount,
      admin_user_id: admin_user_id,
      description: description,
      customer_order_id,
      special_order_id,
    };

    // Save to DB
    const dbResponse = await insertAdditionalCharge(
      additionalDetails,
      AdditionalCharge,
    );

    return { receiptEmail: emailResponse, database: dbResponse };
  } catch (e) {
    throw new Error(e.message);
  }
};
