import { Router } from 'express';
import orderFormPost from './post';
import orderFormGet from './get';
import orderFormPatchStatus from './patchStatus';
import orderFormPatchComments from './patchComments';
import orderFormGetAll from './getAll';

const router = new Router();

// ----------------------------------Add New Order ----------
router.post('/', orderFormPost);

// ----------------------------------Retrieve Order ----------
router.get('/:id', orderFormGet);

// ----------------------------------Retrieve Order ----------
router.get('/', orderFormGetAll);

// ----------------------------------Update Status ----------
router.patch('/:id/status', orderFormPatchStatus);

// ----------------------------------Update Comments ----------
router.patch('/:id/comments', orderFormPatchComments);

export default router;
