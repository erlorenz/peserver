import OrderForm from '../../models/OrderForm';

//
//
const orderFormPatchComments = async (req, res) => {
  // ---- Validate
  if (!req.body.comment || !req.body.user) {
    return res.status(404).json({ error: 'Required data not submitted' });
  }

  // --- Push onto adminComment array
  try {
    const order = await OrderForm.findByIdAndUpdate(
      req.params.id,
      { $push: { adminComments: req.body } },
      { new: true },
    );

    return res.json(order);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};

export default orderFormPatchComments;
