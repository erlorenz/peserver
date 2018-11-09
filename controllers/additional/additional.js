import Order from '../models/Order';
import mailjetAdditional from './mailjet/mailjetAdditional';
import { createCharge } from '../stripe';
import validate from './additionalValidation';

const additional = async (req, res) => {
  // Create data object
  const data = req.body;

  // Create metadata object
  const metadata = { description: data.additionalDescription };

  try {
    // Validate additional data
    validate(data);

    // ---- Make refund
    const charge = await stripe.charges.create(
      data.additionalAmount,
      data.stripeCustomer,
      metadata,
    );

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
