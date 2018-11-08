import { Router } from 'express';
import checkoutController from '../controllers/checkout';

const router = new Router();

router.post('/', checkoutController);

export default router;
