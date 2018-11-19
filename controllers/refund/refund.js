import StripeController from '../stripe';
import EmailController from '../mailjet';
import validate from './refundValidation';
import Order from '../../models/Order';
import { tryCatchAsync } from '../../utils';

export default async (req, res) => {
  // Create refund data object
  const data = req.body;

  // Create metadata object
  const metadata = {
    description: data.refundDescription,
  };

  // Validate data
  validate(data);

  // ---- Make refund
  const refundResponse = await StripeController.createRefund(
    data.refundAmount,
    data.stripeCharge,
    metadata,
  );

  // Send receipt email
  const receiptResponse = await tryCatchAsync(
    EmailController.refundEmail(data),
  );

  // Update database
  const refundDetails = {
    refundID: refundResponse.id,
    refundAmount: data.refundAmount,
    refundTime: Date.now(),
    refundUser: data.user,
    refundDescription: data.refundDescription,
  };

  const order = await Order.findById(req.params.id);
  order.refunds.push(refundDetails);

  res.json({ msg: order, email: receiptResponse });
};
