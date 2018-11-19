import sendEmail from './sendEmail';

// Set up mailjet connection

export default {
  // Receipt email
  receiptEmail: async payload => {
    return await sendEmail(payload, 460188, 'Your Order Confirmation');
  },

  // Refund email
  refundEmail: async payload => {
    return await sendEmail(payload, 4000, 'Your Refund Confirmation');
  },

  // Additional charge email
  additionalEmail: async payload => {
    return await sendEmail(payload, 4000, 'Receipt for Additional Charge');
  },

  // Error email
  errorEmail: async payload => {
    return await sendEmail(payload, 4000, 'There was a checkout error');
  },
};
