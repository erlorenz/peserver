import { Model } from 'objection';
import CustomerOrder from '../CustomerOrder';

export default class Refund extends Model {
  static tableName = 'refund';

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: CustomerOrder,
      join: {
        from: 'refund.order_id',
        to: 'customer_order.id',
      },
    },
  };
}
