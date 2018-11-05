import stripePackage from 'stripe';
import Order from '../../models/Order';
import { stripeTest } from '../../config/keys';
import mailjetRefund from '../../controllers/mailjet/mailjetRefund';

//
const stripe = stripePackage(stripeTest);

//
const refund = async (req, res) => {
  //
  try {
    // ---- Make refund
    const refundResponse = await stripe.refunds.create({
      charge: req.body.stripeCharge,
      amount: req.body.refundAmount,
      metadata: {
        description: req.body.refundDescription,
      },
    });

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
