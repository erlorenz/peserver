import checkout from '../controllers/checkout';

const checkoutHandler = async (req, res) => {
  try {
    const response = await checkout(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: e, message: e.message });
  }
};

export default checkoutHandler;
