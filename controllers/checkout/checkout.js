import StripeController from '../stripe';
import { formatPhone, tryCatchAsync } from '../../utils';
import EmailController from '../mailjet';
import TextController from '../twilio/twilio';
import { textBody } from '../twilio/messages';
import validate from './checkoutValidation';
import Order from '../../models/Order';

export default async (req, res) => {
  // Create order object and metadata object
  const orderFields = req.body;
  const metadata = {
    email: req.body.email,
    name: req.body.name,
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
    const receiptResponse = await tryCatchAsync(
      EmailController.receiptEmail(orderFields),
    );

    // Send twilio text message
    const textResponse = await tryCatchAsync(
      TextController.sendText(textBody.processed, orderFields.phone),
    );

    // Save order in DB
    const dbResponse = await tryCatchAsync(new Order(orderFields).save());

    // Send email if exceptions thrown
    let errorEmailResponse;
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
      errorEmailResponse = await tryCatchAsync(
        EmailController.errorEmail(errorData),
      );
    }
    // Send success response
    res.status(200).json({
      mongoDB: dbResponse,
      twilio: textResponse.status,
      receiptEmail: receiptResponse,
      errorEmail: errorEmailResponse,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
