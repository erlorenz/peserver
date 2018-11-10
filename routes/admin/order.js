import Order from '../../models/Order';

export default async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new Error('No order exists by that ID');
  res.json(order);
};
