import { checkAuth } from '../../utils';

export const Query = {
  getGarments: async (_, args, { models }) => {
    // Perform query
    const garments = await models.Garment.query().orderBy('list_order');
    if (!garments.length) throw new Error('No garments being retrieved');
    return garments;
  },
};

export const Mutation = {
  insertGarment: async (_, args, { currentUser, models }) => {
    checkAuth(currentUser);
    const garment = await models.Garment.query()
      .insert(args)
      .returning('*');

    return { success: true, message: garment.id };
  },

  deleteGarment: async (_, { id }, { currentUser, models }) => {
    checkAuth(currentUser);
    const garment = await models.Garment.query()
      .delete()
      .where({ id });
    return { success: true, message: 'Deleted' };
  },

  updateGarment: async (_, args, { currentUser, models }) => {
    checkAuth(currentUser);
    const { id, ...changes } = args;

    const garment = await models.Garment.query()
      .patch(changes)
      .where('id', id)
      .returning('*')
      .first();

    return { success: true, message: garment.id };
  },
};
