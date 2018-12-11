import { UserInputError, ApolloError } from 'apollo-server-express';

import { textBody, textArray } from '../../services/twilio/messages';
import twilioSend from '../../services/twilio/twilio';

export default async (status, _id, Model) => {
  if (!status) throw new UserInputError('No status submitted');

  const order = await Model.findById(_id);
  if (!order) throw new ApolloError('No order with that ID');

  order.changeStatus(status);

  const result = await order.save();

  // // ------Send twilio message if it is a matching status
  // if (textArray.includes(status))
  //   await twilioSend(textBody[status], order.phone);

  return result;
};
