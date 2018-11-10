import Order from '../../models/Order';

export default async (req, res) => {
  const orders = await Order.find({
    status: {
      $in: ['Processed', 'Picked Up', 'Checked In', 'Out for Delivery'],
    },
  }).sort({ created: -1 });

  res.json(orders);
};
