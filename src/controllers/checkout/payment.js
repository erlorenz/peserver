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
    } catch (e) {
      console.log(e);
      // Return the validation error if it doesnt work
      return {
        stripe_charge: '',
        stripe_customer: '',
        error: 'validation',
        message: e.message,
      };
    }

    // Create Stripe customer
    const customer = await createCustomer(
      orderFields.email,
      orderFields.stripeToken,
      metadata,
    );

    delete orderFields.stripeToken;

    // Create Stripe Charge
    const charge = await createCharge(
      orderFields.total_price,
      customer.id,
      metadata,
    );

    // Return Stripe Charge and Customer ID
    return {
      stripe_charge: charge.id,
      stripe_customer: customer.id,
      error: '',
      message: '',
    };
  } catch (e) {
    // If stripe fails return payment error
    return {
      stripe_charge: '',
      stripe_customer: '',
      error: 'payment',
      message: e.message,
    };
  }
};
