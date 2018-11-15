import Order from '../../models/Order';

export default async (req, res) => {
  const orders = await Order.find({
    status: {
      $in: ['processed', 'pickedUp', 'checkedIn', 'outForDelivery'],
    },
  }).sort({ created: -1 });

  res.json(orders);
};
