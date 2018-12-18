import { Model } from 'objection';
import { Order } from '..';

export default class AdditionalCharge extends Model {
  static tableName = 'additional_charge';

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'additional_charge.order_id',
        to: 'order.id',
      },
    },
  };
}
