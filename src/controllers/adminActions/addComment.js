import Order from '../../models/Order';

export default async (req, res) => {
  // ---- Validate
  if (!req.body.comment) throw new Error('No comment entered');

  // --- Create data
  const commentData = req.body;

  // Get order
  const order = await Order.findById(req.params.id);
  if (!order) throw new Error('No order exists by that ID');

  // Push comment to array and save result
  order.adminComments.push(commentData);
  const result = await order.save();

  res.json(result);
};
