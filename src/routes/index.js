import checkout from './checkout';
import twilio from './twilio';

function initializeRoutes(app) {
  app.use('/checkout', checkout);

  app.use('/twilio', twilio);

  // // Catch all unknown routes
  // app.use((req, res, next) =>
  //   res.status(404).json({ message: '404 not found' }),
  // );
}

export default initializeRoutes;
