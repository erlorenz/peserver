import { Model } from 'objection';
import Order from '../Order';

export default class Refund extends Model {
  static tableName = 'refund';

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'refund.order_id',
        to: 'order.id',
      },
    },
  };
}
