import checkout from '../routes/checkout';
import admin from '../routes/admin';
import auth from '../routes/auth';
import specialOrder from '../routes/specialOrder';
import authorize from '../middleware/authorize';

export default app => {
  app.use('/checkout', checkout);
  app.use('/admin', authorize, admin);
  app.use('/specialorder', authorize, specialOrder);
  app.use('/auth', auth);
  app.get('/', (req, res) => res.send('Server is running'));
};
