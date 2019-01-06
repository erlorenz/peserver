import Joi from 'joi';

export default payload => {
  const schema = {
    name: Joi.string()
      .min(4)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    company: Joi.string().required(),
    phone: Joi.string()
      .min(10)
      .max(10)
      .required(),
    description: Joi.string().required(),
    total_price: Joi.number().required(),
    stripeToken: Joi.string().required(),
  };

  const result = Joi.validate(payload, schema);

  if (result.error) throw new Error(result.error.details[0].message);

  return result;
};
