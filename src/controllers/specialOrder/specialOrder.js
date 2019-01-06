import { createCharge, createCustomer } from '../../services/stripe';
import validate from './specialOrderValidation';
import { formatPhone, checkAuth } from '../../utils';
import insertSpecialOrder from './insertSpecialOrder';

export default async (_, args, { models, currentUser }) => {
  checkAuth(currentUser);

  const orderFields = { ...args };
  const { SpecialOrder } = models;

  // Validate Data
  validate(orderFields);

  // Format Phone
  orderFields.phone = formatPhone(orderFields.phone);

  // Create Metadata
  const metadata = {
    email: orderFields.email,
    name: orderFields.name,
    phone: orderFields.phone,
  };

  // Create Stripe customer
  const customer = await createCustomer(
    orderFields.email,
    orderFields.stripeToken,
    metadata,
  );

  // Create Stripe charge
  const charge = await createCharge(
    orderFields.total_price,
    customer.id,
    metadata,
  );

  // Add Stripe customer and charge to orderFields
  orderFields.stripe_charge = charge.id;
  orderFields.stripe_customer = customer.id;
  delete orderFields.stripeToken;

  // Save order in DB
  const dbResponse = await insertSpecialOrder(orderFields, SpecialOrder);

  // Send success response
  return {
    database: dbResponse,
  };
};
