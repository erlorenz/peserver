import nodeMailjet from 'node-mailjet';

import { mailjetKey, mailjetSecret } from '../../config/keys';

const templateID = 461239;

// Set up mailjet connection and verify
const mailjet = nodeMailjet.connect(
  mailjetKey,
  mailjetSecret,
);

// Begin async request
const request = async (mailjetData) => {
  const {
    email, name, refundDescription, refundAmount,
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
        Subject: 'Refund Receipt',
        Variables: {
          refundDescription,
          refundAmount,
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
