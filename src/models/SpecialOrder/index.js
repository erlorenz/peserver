import { Model } from 'objection';
import AdminCommentDisplay from '../AdminCommentDisplay';
import AdditionalCharge from '../AdditionalCharge';
import Refund from '../Refund';

export default class SpecialOrder extends Model {
  static tableName = 'special_order';

  static relationMappings = {
    refunds: {
      relation: Model.HasManyRelation,
      modelClass: Refund,
      join: {
        from: 'special_order.id',
        to: 'refund.special_order_id',
      },
    },
    adminComments: {
      relation: Model.HasManyRelation,
      modelClass: AdminCommentDisplay,
      join: {
        from: 'special_order.id',
        to: 'admin_comment_display.special_order_id',
      },
    },
    additionalCharges: {
      relation: Model.HasManyRelation,
      modelClass: AdditionalCharge,
      join: {
        from: 'special_order.id',
        to: 'additional_charge.special_order_id',
      },
    },
  };
}
