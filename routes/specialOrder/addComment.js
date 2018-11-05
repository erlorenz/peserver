import SpecialOrder from '../../models/SpecialOrder';

//
//
export default async (req, res) => {
  // ---- Validate
  if (!req.body.comment || !req.body.user) {
    return res.status(400).json({ error: 'Required data not submitted' });
  }

  // --- Push onto adminComment array
  try {
    const order = await SpecialOrder.findByIdAndUpdate(
      req.params.id,
      { $push: { adminComments: req.body } },
      { new: true },
    );

    return res.json(order);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
