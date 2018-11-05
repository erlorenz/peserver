import { Router } from 'express';
import specialOrderController from '../../controllers/specialOrder/specialOrder';
import specialOrderGet from './get';
import specialOrderPatchStatus from './changeStatus';
import specialOrderPatchComments from './addComment';
import specialOrderGetAll from './getAll';

const router = new Router();

// ----------------------------------Add New Order ----------
router.post('/', specialOrderController);

// ----------------------------------Retrieve Individual Order ----------
router.get('/:id', specialOrderGet);

// ----------------------------------Retrieve All Orders ----------
router.get('/', specialOrderGetAll);

// ----------------------------------Update Status ----------
router.patch('/:id/status', specialOrderPatchStatus);

// ----------------------------------Update Comments ----------
router.patch('/:id/comments', specialOrderPatchComments);

export default router;
