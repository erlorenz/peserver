import Order from '../../models/Order';
import EmailController from '../mailjet';
import StripeController from '../stripe';
import validate from './additionalValidation';
import { tryCatchAsync } from '../../utils';

export default async (req, res) => {
  // Create data object
  const data = req.body;

  // Create metadata object
  const metadata = { description: data.additionalDescription };

  // Validate additional data
  validate(data);

  // ---- Make refund
  const charge = await StripeController.createCharge(
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

  const emailResponse = await tryCatchAsync(
    EmailController.additionalEmail(mailjetData),
  );

  const additionalDetails = {
    additionalID: charge.id,
    additionalAmount: data.additionalAmount,
    additionalTime: Date.now(),
    additionalUser: data.user,
    additionalDescription: data.additionalDescription,
  };

  const order = await Order.findById(req.params.id);
  order.additionals.push(additionalDetails);

  res.json({ msg: order, mailjet: emailResponse });
};
