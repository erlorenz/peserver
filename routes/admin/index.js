import { Router } from 'express';
import active from './active';
import { order, addComment, changeStatus } from './order';
import completed from './completed';
import exceptions from './exceptions';
import cancelled from './cancelled';
import specialOrders from './specialOrders';
import {
  specialOrder,
  specialAddComment,
  specialChangeStatus,
} from './specialOrder';
import refundController from '../../controllers/refund';
import additionalController from '../../controllers/additional';
import admin from '../../middleware/admin';
import async from '../../middleware/async';

const router = new Router();

// Lists of orders

router.get('/active', async(active));

router.get('/completed', async(completed));

router.get('/cancelled', async(cancelled));

router.get('/exceptions', async(exceptions));

router.get('/specialOrders', async(specialOrders));

// Single Order

router.get('/order/:id', async(order));

router.put('/order/:id/status', async(changeStatus));

router.put('/order/:id/comments', async(addComment));

router.post('/order/:id/refund', admin, async(refundController));

router.post('/order/:id/additional', admin, async(additionalController));

// Single Special Order

router.get('/specialOrder/:id', async(specialOrder));

router.put('/specialOrder/:id/status', async(specialChangeStatus));

router.put('/specialOrder/:id/comments', async(specialAddComment));

export default router;
