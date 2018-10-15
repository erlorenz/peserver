import OrderForm from '../../models/OrderForm';

const saveOrderForm = async (payload) => {
  try {
    const result = await new OrderForm(payload).save();
    return { status: 'success', message: result };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
};

export default saveOrderForm;
