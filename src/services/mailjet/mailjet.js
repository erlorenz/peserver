import sendEmail from './sendEmail';

// Set up mailjet connection

// Receipt email
export const receiptEmail = async payload => {
  return await sendEmail(payload, 710280, 'Your Press Express Order');
};

// Refund email
export const refundEmail = async payload => {
  return await sendEmail(payload, 4000, 'Your Refund Confirmation');
};

// Additional charge email
export const additionalEmail = async payload => {
  return await sendEmail(payload, 4000, 'Receipt for Additional Charge');
};

// Error email
export const errorEmail = async payload => {
  return await sendEmail(payload, 4000, 'There was a checkout error');
};
