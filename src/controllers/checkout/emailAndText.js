import TextAPI from '../../services/twilio';
import { textBody } from '../../services/twilio/messages';
import { receiptEmail } from '../../services/mailjet';

export default async payload => {
  const orderFields = { ...payload };

  // Send mailjet email
  const receiptResponse = await receiptEmail(orderFields);

  // // Send twilio text message
  const textResponse = await TextAPI(textBody.processed, orderFields.phone);

  return { receiptResponse, textResponse };
};
