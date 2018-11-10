import Order from '../../models/Order';

//
//
const orderPatchComments = async (req, res) => {
  // ---- Validate
  if (!req.body.comment) throw new Error('No comment entered');

  // --- Create data
  const commentData = req.body;

  // --- Push onto adminComment array
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { $push: { adminComments: commentData } },
    { new: true },
  );
  if (!order) throw new Error('No order exists by that ID');
  res.json(order);
};

export default orderPatchComments;
