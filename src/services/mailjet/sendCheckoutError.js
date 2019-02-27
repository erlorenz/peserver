import { mailjetKey, mailjetSecret } from '../../config/keys';
import nodeMailjet from 'node-mailjet';

const mailjet = nodeMailjet.connect(mailjetKey, mailjetSecret);

async function sendCheckoutError(payload) {
  const { database, receipt, text, name, phone, email } = payload;

  try {
    const message = {
      Messages: [
        {
          From: {
            Email: 'support@pressexpresslv.com',
            Name: 'Press Express Automated',
          },
          To: [
            {
              Email: 'support@pressexpresslv.com',
              Name: 'Support',
            },
          ],

          Subject: `ERROR WITH CHECKOUT ${name}`,
          HTMLPart: `<h3>There was a checkout error!</h3><br />
          <h3>${database ? 'Database error' : ''}</h3><br/>
          <h3>${receipt ? 'Receipt error' : ''}</h3><br/>
          <h3>${text ? 'Text error' : ''}</h3><br/>
          <h3>Name: ${name}</h3><br/>
          <h3>Phone: ${phone}</h3><br/>
          <h3>Email: ${email}</h3><br/>
          `,
        },
      ],
    };

    await mailjet.post('send', { version: 'v3.1' }).request(message);
    return { success: true, message: 'Email Sent' };
  } catch (e) {
    console.log(e);
    return { success: false, message: e.ErrorMessage };
  }
}

export default sendCheckoutError;
