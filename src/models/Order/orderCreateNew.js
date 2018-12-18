export default async function(payload) {
  try {
    const order = await this(payload).save();
    return { success: true, message: order };
  } catch (e) {
    return { success: false, message: e.message };
  }
}
