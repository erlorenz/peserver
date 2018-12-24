import StripeController from '../../services/stripe';
import EmailController from '../../services/mailjet';
import validate from './refundValidation';

export default async (payload, Refund) => {
  // Create refund data object
  const data = { ...payload };

  // Create metadata object
  const metadata = {
    description: data.description,
  };

  // Validate data
  validate(data);

  // ---- Make refund
  const refundResponse = await StripeController.createRefund(
    data.amount,
    data.stripe_charge,
    metadata,
  );

  // Send receipt email
  const receiptResponse = await EmailController.refundEmail(data);

  // Update database
  const refundDetails = {
    stripe_refund: refundResponse.id,
    amount: data.amount,
    admin_user_id: data.admin_user_id,
    description: data.description,
  };

  const refund = await Refund.query().insert(refundDetails);

  return refund;
};
