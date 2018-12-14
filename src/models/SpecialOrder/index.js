import updateStatus from './specialOrderUpdateStatus';
import createNew from './specialOrderCreateNew';
import { Model } from 'objection';

export default class SpecialOrder extends Model {
  static tableName = 'specialOrders';

  changeStatus() {
    return updateStatus;
  }

  createNew() {
    return createNew;
  }
}
