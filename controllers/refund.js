import { createRefund } from './stripe';
import mailjetRefund from './mailjet/mailjetRefund';

//
const refund = async (req, res) => {
  // Create metadata object
  const metadata = {
    description: req.body.refundDescription,
  };

  try {
    // ---- Make refund
    const refundResponse = await createRefund(
      req.body.refundAmount,
      req.body.stripeCharge,
      metadata,
    );

    // Send receipt email
    const mailjetData = {
      name: req.body.name,
      email: req.body.email,
      refundAmount: req.body.refundAmount,
      refundDescription: req.body.refundDescription,
    };

    const mailjetResponse = await mailjetRefund(mailjetData);

    // Update database
    const refundDetails = {
      refundID: refundResponse.id,
      refundAmount: req.body.refundAmount,
      refundTime: Date.now(),
      refundUser: req.body.userID,
      refundDescription: req.body.refundDescription,
    };

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: refundDetails },
      { new: true },
    );

    res.json({ msg: order, mailjet: mailjetResponse });

    //
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export default refund;
