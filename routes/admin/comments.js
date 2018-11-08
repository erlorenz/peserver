import Order from '../../models/Order';

//
//
const orderPatchComments = async (req, res) => {
  // ---- Validate
  if (!req.body.comment) {
    return res.status(400).json({ error: 'No comment entered' });
  }

  // --- Create data
  const commentData = req.body;

  // --- Push onto adminComment array
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $push: { adminComments: commentData } },
      { new: true },
    );

    res.json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export default orderPatchComments;
