import OrderForm from '../../models/SpecialOrder';

export default async (req, res) => {
  const order = await OrderForm.findById(req.params.id);
  if (!order) throw new Error('No order exists with that ID');

  res.json(order);
};
