import generateJWT from './generateJWT';
import { ForbiddenError } from 'apollo-server-express';
import { Model } from 'objection';
import userSchema from './userSchema';

export default class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get idColumn() {
    return 'email';
  }

  static get jsonSchema() {
    return userSchema;
  }

  generateJWT() {
    return generateJWT;
  }

  authRole(requiredRole) {
    if (!this.roles.includes(requiredRole))
      throw new ForbiddenError(`Forbidden: ${requiredRole} role required`);
  }
}
