import Joi from 'joi';

export default payload => {
  const schema = {
    comment_body: Joi.string().required(),
    admin_user_id: Joi.string().required(),
    special_order_id: Joi.optional(),
    customer_order_id: Joi.optional(),
  };

  const result = Joi.validate(payload, schema);

  if (result.error) throw new Error(result.error.details[0].message);

  return result;
};
