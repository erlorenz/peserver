import generateJWT from './generateJWT';
import { ForbiddenError } from 'apollo-server-express';
import { Model } from 'objection';
// import schema from './userSchema';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  generateJWT() {
    return generateJWT;
  }

  // static jsonSchema() {
  //   return;
  // }

  authRole(requiredRole) {
    if (!this.roles.includes(requiredRole))
      throw new ForbiddenError(`Forbidden: ${requiredRole} role required`);
  }
}
