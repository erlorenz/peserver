import { ForbiddenError } from 'apollo-server-express';

export default function(requiredRole) {
  if (!this.roles.includes(requiredRole))
    throw new ForbiddenError(`Forbidden: ${requiredRole} role required`);
}
