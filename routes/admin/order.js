import Order from '../../models/Order';
//
//

const orderGet = async (req, res) => {
  // ----Get order by ID
  try {
    const order = await Order.findById(req.params.id);

    res.json(order);
    // Error
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export default orderGet;
