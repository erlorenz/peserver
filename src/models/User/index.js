import generateJWT from './generateJWT';
import { ForbiddenError } from 'apollo-server-express';
import { Model } from 'objection';
import AdminComment from '../AdminComment';

export default class User extends Model {
  static tableName = 'users';

  static relationMappings = {
    comments: {
      relation: Model.HasManyRelation,
      modelClass: AdminComment,
      join: {
        from: 'users.id',
        to: 'admin_comments.user_id',
      },
    },
  };

  generateJWT() {
    return generateJWT;
  }
 
  authRole(requiredRole) {
    if (!this.roles.includes(requiredRole))
      throw new ForbiddenError(`Forbidden: ${requiredRole} role required`);
  }
}
