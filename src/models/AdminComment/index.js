import { Model } from 'objection';
import CustomerOrder from '../CustomerOrder';

export default class AdminComment extends Model {
  static tableName = 'admin_comment';

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/../CustomerOrder`,
      join: {
        from: 'admin_comment.customer_order_id',
        to: 'customer_order.id',
      },
    },
  };
}
