import { Router } from 'express';
import active from './active';
import { orderGet, orderPatch } from './id';
import completed from './completed';
import exceptions from './exceptions';
import cancelled from './cancelled';
import refund from './refund';
import additional from './additional';

const router = new Router();

// ---------------------------------Get all active orders-------------
router.get('/active', active);

// ----------------------------------Get individual order------------
router.get('/order/:id', orderGet);

// ----------------------------------Patch individual order ----------
router.patch('/order/:id', orderPatch);

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
