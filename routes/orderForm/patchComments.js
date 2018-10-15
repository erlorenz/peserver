import OrderForm from '../../models/OrderForm';

//
//
const orderFormPatchComments = async (req, res) => {
  // ---- Validate
  if (!req.body.comment) {
    return res.status(404).json({ error: 'No comment entered' });
  }

  // --- Create data
  const commentData = req.body;

  // --- Push onto adminComment array
  try {
    const order = await OrderForm.findByIdAndUpdate(
      req.params.id,
      { $push: { adminComments: commentData } },
      { new: true },
    );

    return res.json(order);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};

export default orderFormPatchComments;
