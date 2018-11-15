import Order from '../../models/Order';

export default async (req, res) => {
  const orders = await Order.find({ status: 'exception' })
    .sort({ created: -1 })
    .limit(30);

  res.json(orders);
};
