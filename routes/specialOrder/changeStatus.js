import SpecialOrder from '../../models/SpecialOrder';

export default async (req, res) => {
  // --- If incorrect or no status return message
  if (!req.body.status) {
    res.status(400).json({ error: 'nothing entered' });
  }

  try {
    // ---- Get and update order by ID
    const order = await SpecialOrder.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );

    return res.json(order);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
