import validate from './adminCommentValidation';

export default async (payload, AdminComment) => {
  // ---- Validate
  validate(payload);

  try {
    const adminComment = await AdminComment.query().insert(payload);
    console.log(adminComment);

    return { success: true, message: adminComment.id };
  } catch (e) {
    return { success: false, message: e.message };
  }
};
