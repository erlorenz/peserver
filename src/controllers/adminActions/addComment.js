import Order from '../../models/Order';

export default async (commentData, _id, Model) => {
  // ---- Validate
  if (!commentData.comment) throw new Error('No comment entered');

  // Get order
  const order = await Model.findById(_id);
  if (!order) throw new Error('No order exists by that ID');

  // Push comment to array and save result
  order.adminComments.push(commentData);
  const result = await order.save();

  return result;
};
