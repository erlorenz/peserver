import SpecialOrder from '../../models/SpecialOrder';

export default async (req, res) => {
  // Validate
  if (!req.body.status) throw new Error('Nothing entered');

  // Get order by ID, update, and save
  const order = await SpecialOrder.findById(req.params.id);

  // Add the timestamp and choose text
  switch (req.body.status) {
    case 'Picked Up':
      order.pickedUp = Date.now();
      break;

    case 'Checked In':
      order.checkedIn = Date.now();
      break;

    case 'Out For Delivery':
      order.outForDelivery = Date.now();
      break;

    case 'Completed':
      order.completed = Date.now();
      break;

    default:
      throw new Error('Status is incorrect');
  }

  order.status = req.body.status;

  const result = await order.save();

  return res.json(result);
};
