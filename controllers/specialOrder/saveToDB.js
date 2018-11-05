import SpecialOrder from '../../models/SpecialOrder';

const saveSpecialOrder = async payload => {
  try {
    const result = await new SpecialOrder(payload).save();
    return { status: 'success', message: result };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
};

export default saveSpecialOrder;
