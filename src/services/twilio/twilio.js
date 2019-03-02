import twilio from 'twilio';
import { twilioToken, twilioSID, twilioNumber } from '../../config/keys';

export const twilioClient = new twilio(twilioSID, twilioToken);

const TextAPI = async (bodyText, toNumber) => {
  try {
    // Create and send the twilio message
    await twilioClient.messages.create({
      body: bodyText, // This is the message that will be sent
      to: toNumber, // Text this number
      from: twilioNumber, // From a valid Twilio number
    });
    return { success: true, message: 'Twilio Text Sent' };
  } catch (e) {
    return { success: false, message: e.message };
  }
};

export function textNoResponse(bodyText, toNumber) {
  twilioClient.messages.create({
    body: bodyText,
    to: toNumber,
    from: twilioNumber,
  });
}

export default TextAPI;
