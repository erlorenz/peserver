import OrderForm from '../../models/SpecialOrder';
//
//

const orderFormGet = async (req, res) => {
  // ----Get order by ID
  try {
    const order = await OrderForm.findById(req.params.id);

    res.json(order);
    // Error
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export default orderFormGet;