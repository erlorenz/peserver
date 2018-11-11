import OrderForm from '../../../models/SpecialOrder';

export const specialOrder = async (req, res) => {
  const order = await OrderForm.findById(req.params.id);
  if (!order) throw new Error('No order exists with that ID');
  res.json(order);
};

export { default as specialAddComment } from './specialAddComment';

export { default as specialChangeStatus } from './specialChangeStatus';
