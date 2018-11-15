const processedText = `Hi this is Press Express. We received your order... check your email for the receipt and instructions!`;

const pickedUpText = `Update from Press Express: Your items have been picked up!`;

const outForDeliveryText =
  'Update from Press Express: Your items are with the driver and will be delivered soon!';

const completedText =
  'Your items have been dropped off. Thank you for choosing Press Express!';

export const textBody = {
  processed: processedText,
  pickedUp: pickedUpText,
  outForDelivery: outForDeliveryText,
  completed: completedText,
};

// Array of all the ones that actually send a text
export const textArray = ['pickedUp', 'outForDelivery', 'completed'];
