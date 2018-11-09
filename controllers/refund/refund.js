import { createRefund } from '../stripe';
import mailjetRefund from '../mailjet/mailjetRefund';
import validate from './refundValidation';
import Order from '../../models/Order';

export default async (req, res) => {
  // Create refund data object
  const data = req.body;

  // Create metadata object
  const metadata = {
    description: data.refundDescription,
  };

  try {
    // Validate data
    validate(data);

    // ---- Make refund
    const refundResponse = await createRefund(
      data.refundAmount,
      data.stripeCharge,
      metadata,
    );

    // Send receipt email
    const mailjetResponse = await mailjetRefund(data);

    // Update database
    const refundDetails = {
      refundID: refundResponse.id,
      refundAmount: data.refundAmount,
      refundTime: Date.now(),
      refundUser: data.user,
      refundDescription: data.refundDescription,
    };

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: refundDetails },
      { new: true },
    );

    res.json({ msg: order, mailjet: mailjetResponse });

    //
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
