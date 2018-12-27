import Joi from 'joi';

export default payload => {
  const schema = {
    customer_order_id: Joi.optional(),
    special_order_id: Joi.optional(),
    admin_user_id: Joi.string().required(),
    amount: Joi.number().required(),
    stripe_charge: Joi.string().required(),
  };

  const result = Joi.validate(payload, schema);

  if (result.error) throw new Error(result.error.details[0].message);

  return result;
};
