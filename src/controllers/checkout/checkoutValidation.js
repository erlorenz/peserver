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
    pickupDate: Joi.required(),
    pickupHour: Joi.optional(),
    returnDate: Joi.required(),
    returnHour: Joi.optional(),
    cartItems: Joi.array().required(),
    starch: Joi.boolean().optional(),
    specialInstructions: Joi.string().optional(),
    totalPrice: Joi.number().required(),
    promoCode: Joi.string().optional(),
    stripeToken: Joi.string().required(),
  };

  const result = Joi.validate(payload, schema);

  if (result.error) throw new Error(result.error.details[0].message);

  return result;
};
