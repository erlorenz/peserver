import { Router } from 'express';
import checkoutController from '../controllers/checkout/checkout';

const router = new Router();

router.post('/', checkoutController);

export default router;
