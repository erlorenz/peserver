import { createCharge, createCustomer } from '../../services/stripe';
import { formatPhone } from '../../utils';
import * as EmailAPI from '../../services/mailjet';
import TextAPI from '../../services/twilio';
import { textBody } from '../../services/twilio/messages';
import validate from './checkoutValidation';
// import dbTransaction from './dbTransaction';
// import dayjs from 'dayjs';
import { DateTime } from 'luxon';
import CustomerOrder from '../../models/CustomerOrder';

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

    console.log(orderFields.pickup_date);

    // Format phone number - fails on error
    const formattedPhone = formatPhone(orderFields.phone);
    metadata.phone = formattedPhone;
    orderFields.phone = formattedPhone;

    delete orderFields.stripeToken;
    orderFields.stripe_charge = 'dsfsfsdff';
    orderFields.stripe_customer = 'sdfsfsfaf';
    orderFields.receipt_sent = true;
    orderFields.text_sent = true;

    const dbResponse = await CustomerOrder.query().insertGraph(orderFields);
    console.log('[DB RESPONSE]', dbResponse);

    // // Create Stripe customer - fails on error
    // const customer = await createCustomer(
    //   orderFields.email,
    //   orderFields.stripeToken,
    //   metadata,
    // );

    // delete orderFields.stripeToken;

    // // Create Stripe Charge - fails on error
    // const charge = await createCharge(
    //   orderFields.total_price,
    //   customer.id,
    //   metadata,
    // );

    // // Add Stripe customer and charge to orderFields
    // orderFields.stripe_charge = charge.id;
    // orderFields.stripe_customer = customer.id;

    // // Send mailjet email
    // const receiptResponse = await EmailAPI.receiptEmail(orderFields);
    // orderFields.receipt_sent = receiptResponse.success;

    // console.log('[SENT EMAIL');

    // // Send twilio text message
    // const textResponse = await TextAPI(textBody.processed, orderFields.phone);
    // orderFields.text_sent = textResponse.success;
    // console.log('[SENT TEXT]');

    // const { customerOrderItems, ...dataInsert } = orderFields;

    // const dbResponse = await CustomerOrder.query().insert(dataInsert);
    // console.log('[DB RESPONSE]', dbResponse);

    // // Save order in DB
    // const dbResponse = await dbTransaction(orderFields);
    // console.log('[finsihed with DB');

    // Send email if exceptions thrown
    // let errorEmailResponse = 'No error email necessary';
    // if (
    //   !receiptResponse.success ||
    //   !textResponse.success
    //   // ||
    //   // !dbResponse.success
    // ) {
    //   const errorData = {
    //     orderFields,
    //     textResponse,
    //     receiptResponse,
    //     // dbResponse,
    //   };
    //   errorEmailResponse = await EmailAPI.errorEmail(errorData);
    // }

    return {
      database: 'test response',
      // twilio: textResponse,
      // receiptEmail: receiptResponse,
      // errorEmail: errorEmailResponse,
    };
  } catch (e) {
    console.log('THERE WAS AN ERROR AT CHECKOUT: ', e.message);
    throw new Error(e.message);
  }
};
