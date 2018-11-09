import Joi from 'joi';

export default payload => {
  const schema = {
    user: Joi.string().required(),
    additionalDescription: Joi.string().required(),
    additionalAmount: Joi.number().required(),
    stripeCharge: Joi.string().required(),
  };

  const result = Joi.validate(payload, schema);

  if (result.error) throw new Error(result.error.details[0].message);

  return result;
};
