import Order from '../../../models/Order';
import { textBody, textArray } from '../../../controllers/twilio/messages';
import twilioSend from '../../../controllers/twilio/twilio';

export default async (req, res) => {
  const { status } = req.body;

  // Validate
  if (!status) throw new Error('No status chosen');

  // Find order by ID
  const order = await Order.findById(req.params.id);
  if (!order) throw new Error('No order exists by that ID');

  // Change status
  order.changeStatus(status);

  // Save updated order
  const result = await order.save();

  // ------Send twilio message if it is a matching status
  if (textArray.includes(status)) twilioSend(textBody[status], order.phone);

  return res.json(result);
};
