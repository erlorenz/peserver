import Order from '../../models/Order';

const saveOrder = async orderDetails => {
  return await new Order(orderDetails).save();
};

export default saveOrder;
