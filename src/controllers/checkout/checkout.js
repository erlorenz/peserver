import StripeController from '../../services/stripe';
import { formatPhone } from '../../utils';
import EmailAPI from '../../services/mailjet';
import TextAPI from '../../services/twilio';
import { textBody } from '../../services/twilio/messages';
import validate from './checkoutValidation';
import Order from '../../models/Order';
import { ApolloError } from 'apollo-server-express';

export default async payload => {
  // Create order object and metadata object
  const orderFields = payload;
  const metadata = {
    email: payload.email,
    name: payload.name,
  };

  try {
    // Validation
    validate(orderFields);

    // Format phone number - fails on error
    const formattedPhone = formatPhone(orderFields.phone);
    metadata.phone = formattedPhone;
    orderFields.phone = formattedPhone;

    // Create Stripe customer - fails on error
    const customer = await StripeController.createCustomer(
      orderFields.email,
      orderFields.stripeToken,
      metadata,
    );

    // Create Stripe Charge - fails on error
    const charge = await StripeController.createCharge(
      orderFields.totalPrice,
      customer.id,
      metadata,
    );

    // Add Stripe customer and charge to orderFields
    orderFields.stripeCharge = charge.id;
    orderFields.stripeCustomer = customer.id;

    // Send mailjet email
    const receiptResponse = await EmailAPI.receiptEmail(orderFields);
    orderFields.emailSent = receiptResponse.success;

    // Send twilio text message
    const textResponse = await TextAPI.sendText(
      textBody.processed,
      orderFields.phone,
    );
    orderFields.textSent = textResponse.success;

    // Save order in DB
    const dbResponse = await Order.createNew(orderFields);
    console.log(dbResponse);
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
      mongoDB: dbResponse,
      twilio: textResponse,
      receiptEmail: receiptResponse,
      errorEmail: errorEmailResponse,
    };
  } catch (e) {
    throw new ApolloError(e.message);
  }
};
