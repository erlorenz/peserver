import Joi from 'joi';

export default payload => {
  const schema = {
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    room: Joi.string().required(),
    hotel: Joi.string().required(),
    pickup_date: Joi.required(),
    return_date: Joi.required(),
    customerOrderItems: Joi.array().required(),
    starch: Joi.string().optional(),
    crease: Joi.string().optional(),
    special_instructions: Joi.string().optional(),
    total_price: Joi.number().required(),
    promo_code: Joi.string().optional(),
    stripeToken: Joi.string().required(),
  };

  const result = Joi.validate(payload, schema);

  if (result.error) throw new Error(result.error.details[0].message);

  return result;
};
