import Order from '../../models/Order';

//
export default async (req, res) => {
  // ----Get all orders sorted by date
  try {
    const orders = await Order.find({ status: 'Completed' })
      .sort({ created: -1 })
      .limit(30);

    res.json(orders);
    // Error
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
