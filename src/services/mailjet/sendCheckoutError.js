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
            Email: 'admin@pressexpresslv.com',
            Name: 'Admin',
          },
          To: [
            {
              Email: 'support@pressexpresslv.com',
              Name: 'Support',
            },
          ],

          Subject: `ERROR WITH CHECKOUT ${name}`,
          HTMLPart: `<h3>There was a checkout error!</h3><br />
          <h4>${!database ? 'Database error' : ''}</h4><br/>
          <h4>${!receipt ? 'Receipt error' : ''}</h4><br/>
          <h4>${!text ? 'Text error' : ''}</h4><br/>
          <p>Name: ${name}</p><br/>
          <p>Phone: ${phone}</p><br/>
          <p>Email: ${email}</p><br/>
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
