const mailjet = require('node-mailjet').connect(
  '65b100ab0728beb57e012095376a1c35',
  '45f582b6243554948a779a10c91c3cb6',
);

// const send = async (payload, templateID, subject) => {
//   try {
//     const message = {
//       Messages: [
//         {
//           From: {
//             Email: 'support@pressexpresslv.com',
//             Name: 'Press Express',
//           },
//           To: [
//             {
//               Email: payload.email,
//               Name: payload.name,
//             },
//           ],
//           TemplateID: templateID,
//           TemplateLanguage: true,
//           Subject: subject,
//           Variables: payload,
//         },
//       ],
//     };

//     await mailjet.post('send', { version: 'v3.1' }).request(message);
//     return { success: true, message: 'Email Sent' };
//   } catch (e) {
//     return { success: false, message: e.ErrorMessage };
//   }
// };

const request = mailjet.post('send').request({
  FromEmail: 'support@pressexpresslv.com',
  FromName: 'Press Express',
  Subject: 'Your Press Express Order',
  'Text-part':
    'Dear passenger, welcome to Mailjet! May the delivery force be with you!',
  'Html-part':
    '<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!',
  Recipients: [{ Email: 'erikslorenz@gmail.com' }],
});

request
  .then(result => {
    console.log(result.body);
  })
  .catch(err => {
    console.log(err.statusCode);
  });

// const payload = {
//   name: 'Graph insert',
//   phone: '4802418725',
//   email: 'erik@pressexpresslv.com',
//   pickup_date: '1551142800000',
//   return_date: '1551236400000',
//   total_price: 3000,
//   hotel: 'Flamingo',
//   room: 'sdfa',
//   starch: 'no',
//   crease: 'no',
//   special_instructions: '',
//   stripeToken: 'tok_visa',
//   customerOrderItems: [
//     {
//       slug: 'shirtwestern',
//       description: 'Western Shirt',
//       price: 1400,
//       quantity: 1,
//     },
//     {
//       slug: 'sweater',
//       description: 'Sweater',
//       price: 1200,
//       quantity: 1,
//     },
//   ],
// };
