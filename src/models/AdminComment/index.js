import { Model } from 'objection';

export default class AdminComment extends Model {
  static get tableName() {
    return 'admin_comments';
  }
}
