import stripePackage from 'stripe';
import { stripeKey } from '../../config/keys';

const stripe = stripePackage(stripeKey);

// Create New Customer
export const createCustomer = async (email, token, metadata) => {
  return await stripe.customers.create({
    email,
    source: token,
    metadata,
  });
};

// Create New Charge
export const createCharge = async (amount, customerID, metadata) => {
  return await stripe.charges.create({
    amount,
    currency: 'usd',
    description: 'Press Express Las Vegas',
    customer: customerID,
    metadata,
  });
};

// Create New Refund
export const createRefund = async (amount, chargeID, metadata) => {
  return await stripe.refunds.create({
    charge: chargeID,
    amount,
    metadata,
  });
};
