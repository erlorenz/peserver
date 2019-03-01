import checkout from './checkout';

function initializeRoutes(app) {
  app.use('/checkout', checkout);

  // Catch all unknown routes
  app.use((req, res, next) =>
    res.status(404).json({ message: '404 not found' }),
  );
}

export default initializeRoutes;
