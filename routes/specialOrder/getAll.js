import OrderForm from '../../models/SpecialOrder';

export default async (req, res) => {
  // ----Get all orders sorted by date

  const orders = await OrderForm.find().sort({ created: -1 });

  res.json(orders);
};
