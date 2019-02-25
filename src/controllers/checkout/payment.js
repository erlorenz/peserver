import { createCharge, createCustomer } from '../../services/stripe';
import { formatPhone } from '../../utils';
import validate from './checkoutValidation';
import { DateTime } from 'luxon';

export default async payload => {
  // Create order object and metadata object
  const orderFields = { ...payload };
  const metadata = {
    email: orderFields.email,
    name: orderFields.name,
    phone: '',
  };

  try {
    // Validation
    validate(orderFields);

    // Format Timestamps into ISO for Postgres (turn string to number)
    orderFields.pickup_date = DateTime.fromMillis(
      +orderFields.pickup_date,
    ).toISO();
    orderFields.return_date = DateTime.fromMillis(
      +orderFields.return_date,
    ).toISO();

    // Format phone number - fails on error
    const formattedPhone = formatPhone(orderFields.phone);
    metadata.phone = formattedPhone;
    orderFields.phone = formattedPhone;

    // Create Stripe customer - fails on error
    const customer = await createCustomer(
      orderFields.email,
      orderFields.stripeToken,
      metadata,
    );

    delete orderFields.stripeToken;

    // Create Stripe Charge - fails on error
    const charge = await createCharge(
      orderFields.total_price,
      customer.id,
      metadata,
    );

    // Return Stripe Charge and Customer ID
    return {
      stripe_charge: charge.id,
      stripe_customer: customer.id,
    };
  } catch (e) {
    console.log('There was an error at validation or payment: ', e.message);
    throw new Error(e.message);
  }
};
