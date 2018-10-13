import { Router } from 'express';
import stripePackage from 'stripe';
import { stripeTest } from '../../config/keys';


const stripe = stripePackage(stripeTest);
const router = new Router();

// Checkout function
router.post('/', async (req, res) => {
  // Create object of all the fields

  const orderFields = {};
  orderFields.information = req.body.information;
  orderFields.totalPrice = req.body.totalPrice;
  orderFields.name = req.body.name;
  orderFields.email = req.body.email;
  orderFields.company = req.body.company;
  orderFields.phone = req.body.phone;

  try {
    // Create Stripe customer
    const customer = await stripe.customers.create({
      email: req.body.email,
      source: req.body.stripeToken,
      metadata: {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
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


    // Send mailjet email
    const mailjetResponse = await mailjetReceipt(orderFields);
    orderFields.mailjet = mailjetResponse.status;

    // Save order in DB
    const dbResponse = await saveOrder(orderFields);

    // Send email if exceptions thrown
    let errorResponse;
    if (
      mailjetResponse.status === 'error' ||
      dbResponse.status === 'error'
    ) {
      const errorData = {
        orderFields, mailjetResponse, dbResponse,
      };
      errorResponse = await mailjetCheckoutError(errorData);
    }
    console.log('error: ', errorResponse);

    // Send success response
    res.status(200).json({
      mongoDB: dbResponse,
      mailjet: mailjetResponse.status,
      errorEmail: errorResponse,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

export default router;
