import { Model } from 'objection';
// avoid circular import by using direct

export default class AdminComment extends Model {
  static tableName = 'admin_comment';

  static relationMappings = {
    adminUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/../AdminUser`,
      join: {
        from: 'admin_comment.admin_user_id',
        to: 'admin_user.id',
      },
    },
  };
}

export class AdminCommentDisplay extends Model {
  static tableName = 'admin_comment_display';

  static relationMappings = {
    adminUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/../CustomerOrder`,
      join: {
        from: 'admin_comment_display.customer_order_id',
        to: 'customer_order.id',
      },
    },
  };
}
