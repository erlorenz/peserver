import twilio from 'twilio';
import { twilioToken, twilioSID, twilioNumber } from '../../config/keys';

const client = new twilio(twilioSID, twilioToken);

export default {
  async sendText(bodyText, toNumber) {
    try {
      // Create and send the twilio message
      const result = await client.messages.create({
        body: bodyText, // This is the message that will be sent
        to: toNumber, // Text this number
        from: twilioNumber, // From a valid Twilio number
      });
      return result.sid;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};
