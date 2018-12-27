import { createCharge, createCustomer } from '../../services/stripe';
import { formatPhone } from '../../utils';
import EmailAPI from '../../services/mailjet';
import TextAPI from '../../services/twilio';
import { textBody } from '../../services/twilio/messages';
import validate from './checkoutValidation';
import dbTransaction from './dbTransaction';

export default async payload => {
  // Create order object and metadata object
  const orderFields = { ...payload };
  const metadata = {
    email: orderFields.email,
    name: orderFields.name,
    phone: '',
  };

  try {
    // Validation
    validate(orderFields);

    // Format phone number - fails on error
    const formattedPhone = formatPhone(orderFields.phone);
    metadata.phone = formattedPhone;
    orderFields.phone = formattedPhone;

    // Create Stripe customer - fails on error
    const customer = await createCustomer(
      orderFields.email,
      orderFields.stripeToken,
      metadata,
    );

    delete orderFields.stripeToken;

    // Create Stripe Charge - fails on error
    const charge = await createCharge(
      orderFields.total_price,
      customer.id,
      metadata,
    );

    // Add Stripe customer and charge to orderFields
    orderFields.stripe_charge = charge.id;
    orderFields.stripe_customer = customer.id;

    // Send mailjet email
    const receiptResponse = await EmailAPI.receiptEmail(orderFields);
    orderFields.receipt_sent = receiptResponse.success;

    // Send twilio text message
    const textResponse = await TextAPI.sendText(
      textBody.processed,
      orderFields.phone,
    );
    orderFields.text_sent = textResponse.success;

    // Save order in DB
    const dbResponse = await dbTransaction(orderFields);

    // Send email if exceptions thrown
    let errorEmailResponse = 'No error email necessary';
    if (
      !receiptResponse.success ||
      !textResponse.success ||
      !dbResponse.success
    ) {
      const errorData = {
        orderFields,
        textResponse,
        receiptResponse,
        dbResponse,
      };
      errorEmailResponse = await EmailAPI.errorEmail(errorData);
    }
    // Send success response
    return {
      database: dbResponse,
      twilio: textResponse,
      receiptEmail: receiptResponse,
      errorEmail: errorEmailResponse,
    };
  } catch (e) {
    throw new Error(e.message);
  }
};
