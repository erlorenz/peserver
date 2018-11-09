import Order from '../../models/Order';
import mailjetAdditional from '../mailjet/mailjetAdditional';
import { createCharge } from '../stripe';
import validate from './additionalValidation';

export default async (req, res) => {
  // Create data object
  const data = req.body;

  // Create metadata object
  const metadata = { description: data.additionalDescription };

  try {
    // Validate additional data
    validate(data);

    // ---- Make refund
    const charge = await createCharge(
      data.additionalAmount,
      data.stripeCustomer,
      metadata,
    );

    // Send receipt email
    const mailjetData = {
      name: data.name,
      email: data.email,
      additionalAmount: data.additionalAmount,
      additionalDescription: data.additionalDescription,
    };

    const mailjetResponse = await mailjetAdditional(mailjetData);

    const additionalDetails = {
      additionalID: charge.id,
      additionalAmount: data.additionalAmount,
      additionalTime: Date.now(),
      additionalUser: data.user,
      additionalDescription: data.additionalDescription,
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
