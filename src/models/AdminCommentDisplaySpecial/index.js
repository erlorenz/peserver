import { Model } from 'objection';
// avoid circular import by using direct

export default class AdminCommentDisplay extends Model {
  static tableName = 'admin_comment_display_special';

  static relationMappings = {
    adminUser: {
      relation: Model.BelongsToOneRelation,
      modelClass: `${__dirname}/../SpecialOrder`,
      join: {
        from: 'admin_comment_display_special.special_order_id',
        to: 'special_order.id',
      },
    },
  };
}
