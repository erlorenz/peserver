import EmailController from '../../services/mailjet';
import StripeController from '../../services/stripe';
import validate from './additionalValidation';

export default async (payload, AdditionalCharge) => {
  // Create data object
  const data = { ...payload };

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

  const emailResponse = EmailController.additionalEmail(mailjetData);

  const additionalDetails = {
    additionalID: charge.id,
    additionalAmount: data.additionalAmount,
    additionalTime: Date.now(),
    additionalUser: data.user,
    additionalDescription: data.additionalDescription,
  };

  const refund = await AdditionalCharge.query().insert(additionalDetails);

  return refund;
};
