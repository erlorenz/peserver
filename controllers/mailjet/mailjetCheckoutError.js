import nodeMailjet from 'node-mailjet';

import { mailjetKey, mailjetSecret } from '../../config/keys';

// Set up mailjet connection and verify
const mailjet = nodeMailjet.connect(
  mailjetKey,
  mailjetSecret,
);

// Begin async request
const request = async mailjetData => {
  const {
    twilioResponse,
    dbResponse,
    mailjetResponse,
    orderFields,
  } = mailjetData;

  let orderDetails = '';
  let twilioMessage = 'OK';
  let mongoMessage = 'OK';
  let mailjetMessage = 'OK';

  // What to show
  if (twilioResponse.status === 'error') {
    twilioMessage = twilioResponse.message;
  }

  if (mailjetResponse.status === 'error') {
    mailjetMessage = mailjetResponse.message;
  }

  if (dbResponse.status === 'error') {
    mongoMessage = dbResponse.message;
    orderDetails = `<p>Hotel: ${orderFields.hotel} </p>
    <p>Room: ${orderFields.room} </p>
    <p>Pickup Time: ${orderFields.pickupDate} ${orderFields.pickupHour} </p>
    <p>Return Time: ${orderFields.returnDate} ${orderFields.returnHour} <p>
    <p>Total Price: ${orderFields.totalPrice / 100} <p>
    <p>Phone: ${orderFields.phone} </p>
    <p>Email: ${orderFields.email} </p>
    `;
  }

  // Begin mailjet send api data
  const message = {
    Messages: [
      {
        From: {
          Email: 'support@pressexpresslv.com',
          Name: 'Press Express Las Vegas',
        },
        To: [
          {
            Email: 'support@pressexpresslv.com',
            Name: 'Press Express Support',
          },
        ],

        Subject: `Checkout Error - ${orderFields.name}`,
        HTMLPart: `<h3>Checkout Error Information</h3>
        <br />
        <p> ${orderFields.name} </p>
        <p> ${orderFields.stripeCustomer} </p>

        ${orderDetails}
        <p> MongoDB: ${mongoMessage} </p>
        <p> Twilio: ${twilioMessage} </p>
        <p> Mailjet: ${mailjetMessage} </p>`,
      },
    ],
  };

  try {
    await mailjet.post('send', { version: 'v3.1' }).request(message);
    return 'email sent';
  } catch (e) {
    return 'email did not send';
  }
};

export default request;
