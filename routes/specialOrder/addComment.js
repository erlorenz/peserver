import SpecialOrder from '../../models/SpecialOrder';

export default async (req, res) => {
  // ---- Validate
  if (!req.body.comment || !req.body.user) {
    throw new Error('Required data not submitted');
  }

  // --- Push onto adminComment array
  const order = await SpecialOrder.findByIdAndUpdate(
    req.params.id,
    { $push: { adminComments: req.body } },
    { new: true },
  );

  return res.json(order);
};
