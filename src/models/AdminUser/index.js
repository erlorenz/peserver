import generateJWT from './generateJWT';
import { Model } from 'objection';
import AdminComment from '../AdminComment';
import Refund from '../Refund';
import AdditionalCharge from '../AdditionalCharge';

export default class AdminUser extends Model {
  static tableName = 'admin_user';

  static relationMappings = {
    adminComments: {
      relation: Model.HasManyRelation,
      modelClass: AdminComment,
      join: {
        from: 'admin_user.id',
        to: 'admin_comment.admin_user_id',
      },
    },
    refunds: {
      relation: Model.HasManyRelation,
      modelClass: Refund,
      join: {
        from: 'admin_user.id',
        to: 'refund.admin_user_id',
      },
    },
    additionalCharges: {
      relation: Model.HasManyRelation,
      modelClass: AdditionalCharge,
      join: {
        from: 'admin_user.id',
        to: 'additional_charge.admin_user_id',
      },
    },
  };

  generateJWT() {
    return generateJWT;
  }

  authRole(requiredRole) {
    if (!this.role !== requiredRole)
      throw new Error(`Forbidden: ${requiredRole} role required`);
  }
}
