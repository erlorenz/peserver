import { mailjetKey, mailjetSecret } from '../../config/keys';
import nodeMailjet from 'node-mailjet';

const mailjet = nodeMailjet.connect(mailjetKey, mailjetSecret);

export default async (payload, templateID, subject) => {
  try {
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

    await mailjet.post('send', { version: 'v3.1' }).request(message);
    return { success: true, message: 'Email Sent' };
  } catch (e) {
    return { success: false, message: e.ErrorMessage };
  }
};
