import Order from '../../models/Order';

const saveOrder = async orderDetails => {
  try {
    const result = await new Order(orderDetails).save();
    return { status: 'success', message: result };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
};

export default saveOrder;
