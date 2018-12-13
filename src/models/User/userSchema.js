export default {
  type: 'object',
  required: ['email', 'password', 'name'],
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    roles: { type: 'array', items: 'string' },
  },
};
