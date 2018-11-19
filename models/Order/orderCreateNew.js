export default async function(payload) {
  try {
    const result = await new this(payload).save();
    return { success: true, message: result };
  } catch (e) {
    return { success: false, message: e.message };
  }
}
