import updateStatus from './specialOrderUpdateStatus';
import createNew from './specialOrderCreateNew';
import { Model } from 'objection';

export default class AdminComment extends Model {
  static get tableName() {
    return 'refunds';
  }

  changeStatus() {
    return updateStatus;
  }

  createNew() {
    return createNew;
  }
}
