import { Model } from 'objection';

export default class Refund extends Model {
  static tableName = 'refund';

  static relationMappings = {
    customerOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/../CustomerOrder`,
      join: {
        from: 'refund.order_id',
        to: 'customer_order.id',
      },
    },
  };
}
