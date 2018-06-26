import nodeMailjet from 'node-mailjet';

import { mailjetKey, mailjetSecret } from '../keys';

const templateID = 460188;

// Set up mailjet connection and verify
const mailjet = nodeMailjet.connect(
  mailjetKey,
  mailjetSecret,
);

// Begin async request
const request = async (mailjetData, firstName) => {
  const {
    email,
    name,
    cartItems,
    pickupDate,
    pickupHour,
    returnDate,
    returnHour,
    totalPrice,
  } = mailjetData;

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
            Email: email,
            Name: name,
          },
        ],
        TemplateID: templateID,
        TemplateLanguage: true,
        Subject: 'Your Online Order Receipt',
        Variables: {
          firstName,
          cartItems,
          pickupDate,
          pickupHour,
          returnDate,
          returnHour,
          totalPrice,
        },
      },
    ],
  };

  try {
    const response = await mailjet.post('send', { version: 'v3.1' }).request(message);
    return response.body.Messages[0].To[0].MessageID;
  } catch (e) {
    return e.ErrorMessage;
  }
};

export default request;
