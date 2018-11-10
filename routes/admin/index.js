import { Router } from 'express';
import active from './active';
import order from './order';
import completed from './completed';
import exceptions from './exceptions';
import cancelled from './cancelled';
import refundController from '../../controllers/refund';
import additionalController from '../../controllers/additional';
import addComment from './comments';
import changeStatus from './changeStatus';
import admin from '../../middleware/admin';
import async from '../../middleware/async';

const router = new Router();

router.get('/active', async(active));

router.get('/completed', async(completed));

router.get('/cancelled', async(cancelled));

router.get('/exceptions', async(exceptions));

router.get('/order/:id', async(order));

router.put('/order/:id/status', async(changeStatus));

router.put('/order/:id/comments', async(addComment));

router.post('/order/:id/refund', admin, async(refundController));

router.post('/order/:id/additional', admin, async(additionalController));

export default router;
