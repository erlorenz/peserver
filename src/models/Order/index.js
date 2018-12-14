import { Model } from 'objection';
import updateStatus from './orderUpdateStatus';
import createNew from './orderCreateNew';

export default class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  changeStatus() {
    return updateStatus;
  }

  createNew() {
    return createNew;
  }
}
