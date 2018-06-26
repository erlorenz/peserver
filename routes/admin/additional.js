import stripePackage from 'stripe';
import Order from '../../models/Order';
import { stripeTest } from '../../config/keys';
import mailjetAdditional from '../../config/mailjet/mailjetAdditional';

//
const stripe = stripePackage(stripeTest);

//
const additional = async (req, res) => {
  //
  try {
    // ---- Make refund
    const charge = await stripe.charges.create({
      amount: req.body.additionalAmount,
      currency: 'usd',
      description: 'Press Express Las Vegas',
      customer: req.body.stripeCustomer,
      metadata: {
        description: req.body.additionalDescription,
      },
    });

    // Send receipt email
    const mailjetData = {
      name: req.body.name,
      email: req.body.email,
      additionalAmount: req.body.additionalAmount,
      additionalDescription: req.body.additionalDescription,
    };

    const mailjetResponse = await mailjetAdditional(mailjetData);

    const additionalDetails = {
      additionalID: charge.id,
      additionalAmount: req.body.additionalAmount,
      additionalTime: Date.now(),
      additionalUser: req.body.userID,
      additionalDescription: req.body.additionalDescription,
    };

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: additionalDetails },
      { new: true },
    );

    res.json({ msg: order, mailjet: mailjetResponse });

    //
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export default additional;
