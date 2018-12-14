import { Model } from 'objection';

export default class Refund extends Model {
  static get tableName() {
    return 'refunds';
  }
}
