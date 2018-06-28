import Order from '../../models/Order';

const saveOrder = async (payload) => {
  try {
    const result = await new Order(payload).save();
    return { status: 'success', message: result };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
};

export default saveOrder;
