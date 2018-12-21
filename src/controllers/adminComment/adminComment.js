import validate from './adminCommentValidation';

export default async (payload, AdminComment) => {
  // ---- Validate
  validate(payload);

  try {
    const adminComment = await AdminComment.query().insert(payload);
    console.log(adminComment.created_at);

    return adminComment;
  } catch (e) {
    return { success: false, message: e.message };
  }
};
