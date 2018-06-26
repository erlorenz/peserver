import Order from '../../models/Order';
import { twilioSend, pickupText, outForDeliveryText, completedText } from '../../config/twilio';
//
//

const orderGet = async (req, res) => {
  // ----Get order by ID
  try {
    const order = await Order.findById(req.params.id);

    res.json(order);
    // Error
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

//
//
const orderPatch = async (req, res) => {
  const updates = req.body;
  let bodyText = '';

  // ------Add the timestamp to the status update
  if (req.body.status === 'Picked Up') {
    updates.pickedUp = Date.now();
    bodyText = pickupText;
  }

  if (req.body.status === 'Checked In') {
    updates.checkedIn = Date.now();
  }

  if (req.body.status === 'Out for Delivery') {
    updates.outForDelivery = Date.now();
    bodyText = outForDeliveryText;
  }

  if (req.body.status === 'Completed') {
    updates.delivered = Date.now();
    bodyText = completedText;
  }

  //
  try {
    // ---- Get and update order by ID
    const order = await Order.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true });

    res.json(order);

    // ------Send twilio message if it has bodytext
    if (bodyText) {
      twilioSend(bodyText, order.phone);
    }
    //
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export { orderGet, orderPatch };
