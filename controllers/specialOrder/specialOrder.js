import SpecialOrder from '../../models/SpecialOrder';
import StripeController from '../stripe';
import validate from './specialOrderValidation';
import { tryCatchAsync } from '../../utils';
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
  const customer = await StripeController.createCustomer(
    orderFields.email,
    orderFields.stripeToken,
    metadata,
  );

  // Create Stripe charge
  const charge = await StripeController.createCharge(
    orderFields.totalPrice,
    customer.id,
    metadata,
  );

  // Add Stripe customer and charge to orderFields
  orderFields.stripeCharge = charge.id;
  orderFields.stripeCustomer = customer.id;

  // Save order in DB
  const dbResponse = tryCatchAsync(new SpecialOrder(orderFields).save());

  // Send success response
  res.status(200).json({
    mongoDB: dbResponse,
  });
};
