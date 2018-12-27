import validate from './adminCommentValidation';
import { checkAuth } from '../../utils';

export default async (payload, { models, currentUser }) => {
  checkAuth(currentUser);

  validate(payload);

  try {
    const adminComment = await models.AdminComment.query().insert(payload);

    return { success: true, message: adminComment.id };
  } catch (e) {
    return { success: false, message: e.detail || e.message };
  }
};
