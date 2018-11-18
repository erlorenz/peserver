import sendEmail from './sendEmail';

// Set up mailjet connection

export default {
  // Receipt email
  receiptEmail(payload) {
    sendEmail(payload, 460188, 'Your Order Confirmation');
  },

  // Refund email
  refundEmail(payload) {
    sendEmail(payload, 4000, 'Your Refund Confirmation');
  },

  // Additional charge email
  additionalEmail(payload) {
    sendEmail(payload, 4000, 'Receipt for Additional Charge');
  },

  // Error email
  errorEmail(payload) {
    sendEmail(payload, 4000, 'There was a checkout error');
  },
};
