import { createCustomer, createCharge } from '../stripe';
import formatPhone from './formatPhone';
import mailjetReceipt from '../mailjet/mailjetReceipt';
import mailjetCheckoutError from '../mailjet/mailjetCheckoutError';
import twilioSend from '../twilio/twilio';
import { processedText } from '../twilio/messages';

const checkout = async (req, res) => {
  // Create order object and metadata object
  const orderFields = req.body;
  const metadata = {
    email: req.body.email,
    name: req.body.name,
  };

  try {
    // Format phone number - fails on error
    const formattedPhone = formatPhone(req.body.phone);
    metadata.phone = formattedPhone;

    // Create Stripe customer - fails on error
    const customer = await createCustomer(
      orderFields.email,
      orderFields.stripeToken,
      metadata,
    );

    // Create Stripe Charge - fails on error
    const charge = await createCharge(
      orderFields.totalPrice,
      customer.id,
      metadata,
    );

    // Add Stripe customer and charge to orderFields
    orderFields.stripeCharge = charge.id;
    orderFields.stripeCustomer = customer.id;

    // Get first name
    const firstName = orderFields.name.split(' ')[0];

    // Send mailjet email
    const mailjetResponse = await mailjetReceipt(orderFields, firstName);
    orderFields.mailjet = mailjetResponse.status;

    // Send twilio text message
    const bodyText = processedText(firstName);
    const twilioResponse = await twilioSend(bodyText, orderFields.phone);
    orderFields.twilio = twilioResponse.status;

    // Save order in DB
    const dbResponse = await saveOrder(orderFields);

    // Send email if exceptions thrown
    let errorResponse;
    if (
      mailjetResponse.status === 'error' ||
      twilioResponse.status === 'error' ||
      dbResponse.status === 'error'
    ) {
      const errorData = {
        orderFields,
        twilioResponse,
        mailjetResponse,
        dbResponse,
      };
      errorEmailResponse = await mailjetCheckoutError(errorData);
    }
    console.log('error: ', errorResponse);

    // Send success response
    res.status(200).json({
      mongoDB: dbResponse,
      twilio: twilioResponse.status,
      mailjet: mailjetResponse.status,
      errorEmail: errorEmailResponse,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export default checkout;
