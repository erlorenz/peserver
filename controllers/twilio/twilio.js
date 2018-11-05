import twilio from 'twilio';
import { twilioToken, twilioSID, twilioNumber } from '../../config/keys';

const client = new twilio(twilioSID, twilioToken);

const twilioSend = async (bodyText, toNumber) => {
  const response = { status: 'success' };
  try {
    // Create and send the twilio message
    const message = await client.messages.create({
      body: bodyText, // This is the message that will be sent
      to: toNumber, // Text this number
      from: twilioNumber, // From a valid Twilio number
    });
    response.message = message.sid;
  } catch (e) {
    response.status = 'error';
    response.message = e.message;
  }
  return response;
};

export default twilioSend;
