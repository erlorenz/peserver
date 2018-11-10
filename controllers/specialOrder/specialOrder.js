import saveToDB from './saveToDB';
import { createCustomer, createCharge } from '../stripe';
import validate from './specialOrderValidation';
//
//

export default async (req, res) => {
  const orderFields = req.body;
  const metadata = {
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
  };

  // Validate Data
  validate(orderFields);

  // Create Stripe customer
  const customer = await createCustomer(
    orderFields.email,
    orderFields.stripeToken,
    metadata,
  );

  // Create Stripe charge
  const charge = await createCharge(
    orderFields.totalPrice,
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
    mongoDB: dbResponse,
  });
};
