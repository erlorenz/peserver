import SpecialOrder from '../../models/SpecialOrder';
import StripeController from '../../services/stripe';
import validate from './specialOrderValidation';
//
//

export default async payload => {
  const orderFields = { ...payload };

  // Validate Data
  validate(orderFields);

  // Create Metadata
  const metadata = {
    email: orderFields.email,
    name: orderFields.name,
    phone: orderFields.phone,
  };

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
  const dbResponse = await new SpecialOrder(orderFields).save();

  // Send success response
  return {
    mongoDB: dbResponse,
  };
};
