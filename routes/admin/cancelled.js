import Order from '../../models/Order';

//
export default async (req, res) => {
  // ----Get all orders sorted by date
  try {
    const orders = await Order.find({ status: 'Cancelled' })
      .sort({ created: -1 })
      .limit(30);

    res.json(orders);
    //
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
