import { Router } from 'express';
import checkoutController from '../controllers/checkout';
import async from '../middleware/async';

const router = new Router();

router.post('/', async(checkoutController));

export default router;
