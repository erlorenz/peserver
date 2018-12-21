import generateJWT from './generateJWT';
import { ForbiddenError } from 'apollo-server-express';
import { Model } from 'objection';

export default class User extends Model {
  static tableName = 'admin_user';

  // static relationMappings = {
  //   adminComments: {
  //     relation: Model.HasManyRelation,
  //     modelClass: AdminComment,
  //     join: {
  //       from: 'user.id',
  //       to: 'admin_comment.user_id',
  //     },
  //   },
  // };

  generateJWT() {
    return generateJWT;
  }

  authRole(requiredRole) {
    if (!this.roles.includes(requiredRole))
      throw new ForbiddenError(`Forbidden: ${requiredRole} role required`);
  }
}
