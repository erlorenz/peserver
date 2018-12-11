export default async fn => {
  try {
    const result = await fn;
    return { success: true, message: result };
  } catch (e) {
    return { success: false, message: e.message };
  }
};
