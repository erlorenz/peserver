import Order from '../../models/Order';
import {
  pickupText,
  outForDeliveryText,
  completedText,
} from '../../controllers/twilio/messages';
import twilioSend from '../../controllers/twilio/twilio';

export default async (req, res) => {
  let bodyText;

  // Validate
  if (!req.body.status) throw new Error('No status chosen');

  // Find order by ID
  const order = await Order.findById(req.params.id);
  if (!order) throw new Error('No order exists by that ID');

  // ------Add the timestamp and choose text
  switch (req.body.status) {
    case 'Picked Up':
      order.pickedUp = Date.now();
      bodyText = pickupText;
      break;

    case 'Checked In':
      order.checkedIn = Date.now();
      break;

    case 'Out For Delivery':
      order.outForDelivery = Date.now();
      bodyText = outForDeliveryText;
      break;

    case 'Completed':
      order.completed = Date.now();
      bodyText = completedText;
      break;

    default:
      throw new Error('Status is incorrect');
  }

  order.status = req.body.status;

  // Save updated order
  const result = await order.save();

  // ------Send twilio message if it has bodytext
  if (bodyText) twilioSend(bodyText, order.phone);

  return res.json(result);
};
