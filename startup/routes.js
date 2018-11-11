import checkout from '../routes/checkout';
import admin from '../routes/admin';
import auth from '../routes/auth';
import specialOrderForm from '../routes/specialOrderForm';
import authorize from '../middleware/authorize';

export default app => {
  app.use('/checkout', checkout);
  app.use('/admin', authorize, admin);
  app.use('/specialorder', authorize, specialOrderForm);
  app.use('/auth', auth);
  app.get('/', (req, res) => res.status(400).send('Server is running'));
  app.get('/*', (req, res) => res.status(400).send('BAD ADDRESS'));
  app.post('/*', (req, res) => res.status(400).send('BAD ADDRESS'));
  app.put('/*', (req, res) => res.status(400).send('BAD ADDRESS'));
  app.delete('/*', (req, res) => res.status(400).send('BAD ADDRESS'));
};
