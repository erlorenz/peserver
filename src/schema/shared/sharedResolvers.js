import updateStatusController from '../../controllers/updateStatus';

export const Mutation = {
  updateStatus(_, args, context) {
    return updateStatusController(args, context);
  },
};
