import OrderForm from '../../models/SpecialOrder';

const orderFormPatchStatus = async (req, res) => {
  // --- If incorrect or no status return message
  if (!req.body.status) {
    res.status(404).json({ error: 'nothing entered' });
  }

  try {
    // ---- Get and update order by ID
    const order = await OrderForm.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    return res.json(order);
  } catch (e) {
    return res.status(404).json({ error: e.message });
  }
};

export default orderFormPatchStatus;
