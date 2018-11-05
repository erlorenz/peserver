import twilio from 'twilio';
import { twilioToken, twilioSID, twilioNumber } from '../config/keys';

const client = new twilio(twilioSID, twilioToken);

export const twilioSend = async (bodyText, toNumber) => {
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

export const processedText = name =>
  `Hi ${name}, we got your order. Thanks for choosing Press Express!`;

export const pickupText = 'Your items have been picked up!';

export const outForDeliveryText = 'Your items are with the driver and will be delivered soon!';

export const completedText = 'Your items have been dropped off. Thanks for choosing Press Express!';
