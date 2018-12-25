import additionalChargeController from '../../controllers/additionalCharge';

export const Query = {};

export const Mutation = {
  insertAdditionalCharge: (_, { payload }, { models }) =>
    additionalChargeController(payload, models.AdditionalCharge),
};
