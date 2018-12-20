import { Model } from 'objection';
import Order from '../Order';
import User from '../User';

export default class AdminComment extends Model {
  static tableName = 'admin_comment';

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: Order,
      join: {
        from: 'admin_comment.order_id',
        to: 'order.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'admin_comment.order_id',
        to: 'user.id',
      },
    },
  };
}
