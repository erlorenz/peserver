import { Model } from 'objection';
import { Order } from '..';

export default class OrderItem extends Model {
  static tableName = 'order_item';

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'order_item.order_id',
        to: 'order.id',
      },
    },
  };
}
