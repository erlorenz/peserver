export default async (refundDetails, { Refund }) => {
  try {
    const refund = await Refund.query().insert(refundDetails);
    return { success: true, message: refund.id };
  } catch (e) {
    return { success: false, message: e.detail || e.message };
  }
};
