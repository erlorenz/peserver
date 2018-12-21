import { Model } from 'objection';
import CustomerOrderItem from '../CustomerOrderItem';
import AdminComment from '../AdminComment';
import Refund from '../Refund';

export default class CustomerOrder extends Model {
  static tableName = 'customer_order';

  static relationMappings = {
    customerOrderItems: {
      relation: Model.HasManyRelation,
      modelClass: CustomerOrderItem,
      join: {
        from: 'customer_order.id',
        to: 'customer_order_item.customer_order_id',
      },
    },
    refunds: {
      relation: Model.HasManyRelation,
      modelClass: Refund,
      join: {
        from: 'customer_order.id',
        to: 'refund.customer_order_id',
      },
    },
    adminComments: {
      relation: Model.HasManyRelation,
      modelClass: AdminComment,
      join: {
        from: 'customer_order.id',
        to: 'admin_comment.customer_order_id',
      },
    },
  };
}
