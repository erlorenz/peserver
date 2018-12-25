import { Model } from 'objection';
// avoid circular import by using direct

export default class AdditionalCharge extends Model {
  static tableName = 'additional_charge';

  static relationMappings = {
    customerOrder: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/../CustomerOrder`,
      join: {
        from: 'additional_charge.customer_order_id',
        to: 'customer_order.id',
      },
    },
  };
}
