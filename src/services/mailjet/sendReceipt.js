import { mailjetKey, mailjetSecret } from '../../config/keys';
import nodeMailjet from 'node-mailjet';

const mailjet = nodeMailjet.connect(mailjetKey, mailjetSecret);

const sendReceipt = async payload => {
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
              Email: 'erikslorenz@gmail.com',
              Name: 'Erik Lorenz',
            },
          ],
          TemplateID: 710280,
          TemplateLanguage: true,
          Subject: 'Your Press Express Order',
          Variables: payload,
          TemplateErrorDeliver: true,
          TemplateErrorReporting: {
            Email: payload.email,
            Name: payload.name,
          },
        },
        {
          From: {
            Email: 'support@pressexpresslv.com',
            Name: 'Order Update',
          },
          To: [
            {
              Email: 'support@pressexpresslv.com',
              Name: 'Press Express',
            },
          ],
          TemplateID: 710280,
          TemplateLanguage: true,
          Subject: 'New Order',
          Variables: payload,
          TemplateErrorDeliver: true,
          TemplateErrorReporting: {
            Email: 'support@pressexpresslv.com',
            Name: 'Error With Template',
          },
        },
      ],
    };

    await mailjet.post('send', { version: 'v3.1' }).request(message);
    console.log(payload.customerOrderItems);
    return { success: true, message: 'Email Sent' };
  } catch (e) {
    console.log(e);
    console.log(payload.customerOrderItems);
    return { success: false, message: e.ErrorMessage };
  }
};

export default sendReceipt;
