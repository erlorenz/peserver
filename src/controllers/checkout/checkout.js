// // Send mailjet email
// const receiptResponse = await EmailAPI.receiptEmail(orderFields);
// orderFields.receipt_sent = receiptResponse.success;

// console.log('[SENT EMAIL');

// // Send twilio text message
// const textResponse = await TextAPI(textBody.processed, orderFields.phone);
// orderFields.text_sent = textResponse.success;
// console.log('[SENT TEXT]');

// const { customerOrderItems, ...dataInsert } = orderFields;

// const dbResponse = await CustomerOrder.query().insert(dataInsert);
// console.log('[DB RESPONSE]', dbResponse);

// // Save order in DB
// const dbResponse = await dbTransaction(orderFields);
// console.log('[finsihed with DB');

// Send email if exceptions thrown
// let errorEmailResponse = 'No error email necessary';
// if (
//   !receiptResponse.success ||
//   !textResponse.success
//   // ||
//   // !dbResponse.success
// ) {
//   const errorData = {
//     orderFields,
//     textResponse,
//     receiptResponse,
//     // dbResponse,
//   };
//   errorEmailResponse = await EmailAPI.errorEmail(errorData);
// }

return {
  stripe: 'test response',
  // twilio: textResponse,
  // receiptEmail: receiptResponse,
  // errorEmail: errorEmailResponse,
};
