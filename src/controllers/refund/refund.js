import StripeController from '../../services/stripe';
import EmailController from '../../services/mailjet';
import validate from './refundValidation';
import Order from '../../models/Order';

export default async payload => {
  // Create refund data object
  const data = { ...payload };

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
  const receiptResponse = await EmailController.refundEmail(data);

  // Update database
  const refundDetails = {
    refundID: refundResponse.id,
    refundAmount: data.refundAmount,
    refundTime: Date.now(),
    refundUser: data.user,
    refundDescription: data.refundDescription,
  };

  const order = await Order.findById(payload._id);
  order.refunds.push(refundDetails);

  return { msg: order, email: receiptResponse };
};
