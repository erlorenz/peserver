import { Router } from 'express';
import active from './active';
import orderGet from './order';
import completed from './completed';
import exceptions from './exceptions';
import cancelled from './cancelled';
import refund from './refund';
import additional from './additional';
import orderPatchComments from './comments';
import orderPatchStatus from './status';

const router = new Router();

// ---------------------------------Get all active orders-------------
router.get('/active', active);

// ----------------------------------Get individual order------------
router.get('/order/:id', orderGet);

// ----------------------------------Update status ----------
router.patch('/order/:id/status', orderPatchStatus);

// ----------------------------------Update status ----------
router.patch('/order/:id/comments', orderPatchComments);

// ----------------------------------Get recent completed orders ----------
router.get('/completed', completed);

// ----------------------------------Get recent cancelled orders ----------
router.get('/cancelled', cancelled);

// ----------------------------------Get recent exceptions -------------
router.get('/exceptions', exceptions);

// ----------------------------------Patch refund ----------
router.patch('/order/:id/refund', refund);

// ----------------------------------Patch additional charge ----------
router.patch('/order/:id/additional', additional);

//
export default router;
