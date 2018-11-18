import { mailjetKey, mailjetSecret } from '../../config/keys';
import nodeMailjet from 'node-mailjet';

const mailjet = nodeMailjet.connect(
  mailjetKey,
  mailjetSecret,
);

export default async (payload, templateID, subject) => {
  const message = {
    Messages: [
      {
        From: {
          Email: 'support@pressexpresslv.com',
          Name: 'Press Express',
        },
        To: [
          {
            Email: payload.email,
            Name: payload.name,
          },
        ],
        TemplateID: templateID,
        TemplateLanguage: true,
        Subject: subject,
        Variables: payload,
      },
    ],
  };

  try {
    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request(message);
    return result.body.Messages[0].To[0].MessageID;
  } catch (e) {
    throw new Error(e.ErrorMessage);
  }
};
