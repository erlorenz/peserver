export default async (orderFields, SpecialOrder) => {
  try {
    const order = await SpecialOrder.query().insert(orderFields);
    console.log(order);

    return { success: true, message: order.id };
  } catch (e) {
    return { success: false, message: e.detail || e.message };
  }
};
