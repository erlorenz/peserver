import { Model } from 'objection';
import updateStatus from './orderUpdateStatus';
import { OrderItem, AdminComment, Refund, AdditionalCharge } from '..';

export default class Order extends Model {
  static tableName = 'order';

  changeStatus() {
    return updateStatus;
  }

  static relationMappings = {
    orderItems: {
      relation: Model.HasManyRelation,
      modelClass: OrderItem,
      join: {
        from: 'order.id',
        to: 'order_item.order_id',
      },
    },
    adminComments: {
      relation: Model.HasManyRelation,
      modelClass: AdminComment,
      join: {
        from: 'order.id',
        to: 'admin_comment.order_id',
      },
    },
    refunds: {
      relation: Model.HasManyRelation,
      modelClass: Refund,
      join: {
        from: 'order.id',
        to: 'refund.order_id',
      },
    },
    additionalCharges: {
      relation: Model.HasManyRelation,
      modelClass: AdditionalCharge,
      join: {
        from: 'order.id',
        to: 'additional_charge.order_id',
      },
    },
  };
}
