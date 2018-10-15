import { Router } from 'express';
import orderFormPost from './post';
import orderFormGet from './get';
import orderFormPatchStatus from './patchStatus';
import orderFormPatchComments from './patchComments';


const router = new Router();


// ----------------------------------Add New Order ----------
router.post('/', orderFormPost);

// ----------------------------------Retrieve Order ----------
router.get('/', orderFormGet);

// ----------------------------------Update Status ----------
router.patch('/order/:id/status', orderFormPatchStatus);

// ----------------------------------Update Comments ----------
router.patch('/order/:id/comments', orderFormPatchComments);


export default router;
