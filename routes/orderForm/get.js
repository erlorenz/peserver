import OrderForm from '../../models/OrderForm';
//
//

const orderFormGet = async (req, res) => {
  // ----Get order by ID
  try {
    const order = await OrderForm.findById(req.params.id);

    res.json(order);
    // Error
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

export default orderFormGet;
