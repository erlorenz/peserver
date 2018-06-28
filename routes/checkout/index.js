import { Router } from 'express';
import stripePackage from 'stripe';
import { stripeTest } from '../../config/keys';
import { processedText, twilioSend } from '../../apis/twilio';
import formatPhone from './formatPhone';
import mailjetReceipt from '../../apis/mailjet/mailjetReceipt';
import mailjetCheckoutError from '../../apis/mailjet/mailjetCheckoutError';
import saveOrder from './saveOrder';

const stripe = stripePackage(stripeTest);
const router = new Router();

// Checkout function
router.post('/', async (req, res) => {
  // Create object of all the fields

  const orderFields = {};
  orderFields.hotel = req.body.scheduled.hotel;
  orderFields.room = req.body.scheduled.room;
  orderFields.pickupDate = req.body.scheduled.pickupDate;
  orderFields.pickupHour = req.body.scheduled.pickupHour;
  orderFields.returnDate = req.body.scheduled.returnDate;
  orderFields.returnHour = req.body.scheduled.returnHour;
  orderFields.cartItems = req.body.cartItems;
  orderFields.specialInstructions = req.body.specialInstructions;
  orderFields.starch = req.body.starch;
  orderFields.totalPrice = req.body.totalPrice;
  orderFields.promoCode = req.body.promoCode;
  orderFields.name = req.body.name;
  orderFields.email = req.body.email;

  try {
    // Format phone number
    const phone = formatPhone(req.body.phone);
    orderFields.phone = phone;

    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: req.body.email,
      source: req.body.stripeToken,
      metadata: {
        email: req.body.email,
        name: req.body.name,
        phone,
      },
    });

    // Create Stripe charge
    const charge = await stripe.charges.create({
      amount: req.body.totalPrice,
      currency: 'usd',
      description: 'Press Express Las Vegas',
      customer: customer.id,
    });

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
        orderFields, twilioResponse, mailjetResponse, dbResponse,
      };
      errorResponse = await mailjetCheckoutError(errorData);
    }
    console.log('error: ', errorResponse);

    // Send success response
    res.status(200).json({
      mongoDB: dbResponse,
      twilio: twilioResponse.status,
      mailjet: mailjetResponse.status,
      errorEmail: errorResponse,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
