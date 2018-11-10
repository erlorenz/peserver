import SpecialOrder from '../../models/SpecialOrder';

export default async (req, res) => {
  const { status } = req.body;

  // Validate
  if (!status) throw new Error('Nothing entered');

  // Get order by ID, update, and save
  const order = await SpecialOrder.findById(req.params.id);

  if (!order) throw new Error('No order exists by that ID');

  // Change status
  order.changeStatus(status);

  // Save updated order
  const result = await order.save();

  return res.json(result);
};
