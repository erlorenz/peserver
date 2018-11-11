import SpecialOrder from '../../../models/SpecialOrder';

export default async (req, res) => {
  // ---- Validate
  if (!req.body.comment || !req.body.user) {
    throw new Error('Required data not submitted');
  }

  // Get order
  const order = await SpecialOrder.findById(req.params.id);
  if (!order) throw new Error('No order exists by that ID');

  // Push comment to array and save result
  order.adminComments.push(req.body);
  const result = await order.save();

  return res.json(result);
};
