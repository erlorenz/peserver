import { Router } from 'express';
import specialOrderController from '../controllers/specialOrder';
import async from '../middleware/async';

const router = new Router();

// ----------------------------------Add New Order ----------
router.post('/', async(specialOrderController));

export default router;
