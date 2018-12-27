import changeStatusController from '../../controllers/changeStatus';

export const Mutation = {
  changeStatus(_, args, context) {
    return changeStatusController(args, context);
  },
};
