import Joi from 'joi';

export default payload => {
  const schema = {
    _id: Joi.string().required(),
    user: Joi.string().required(),
    refundDescription: Joi.string().required(),
    refundAmount: Joi.number().required(),
    stripeCharge: Joi.string().required(),
  };

  const result = Joi.validate(payload, schema);

  if (result.error) throw new Error(result.error.details[0].message);

  return result;
};