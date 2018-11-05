import saveToDB from './saveToDB';
import { createCustomer, createCharge } from '../stripe';
//
//

export default async (req, res) => {
  const orderFields = req.body;
  const metadata = {
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
  };

  try {
    // Create Stripe customer
    const customer = await createCustomer(
      req.body.email,
      req.body.stripeToken,
      metadata,
    );

    // Create Stripe charge
    const charge = await createCharge(
      req.body.totalPrice,
      customer.id,
      metadata,
    );

    // Add Stripe customer and charge to orderFields
    orderFields.stripeCharge = charge.id;
    orderFields.stripeCustomer = customer.id;

    // Save order in DB
    const dbResponse = await saveToDB(orderFields);

    // Send success response
    res.status(200).json({
      stripe: 'Success',
      mongoDB: dbResponse,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
