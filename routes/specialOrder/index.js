import { Router } from 'express';
import specialOrderController from '../../controllers/specialOrder';
import order from './get';
import changeStatus from './changeStatus';
import addComment from './addComment';
import active from './getAll';
import async from '../../middleware/async';

const router = new Router();

// ----------------------------------Add New Order ----------
router.post('/', async(specialOrderController));

router.get('/:id', async(order));

router.get('/', async(active));

router.put('/:id/status', async(changeStatus));

router.put('/:id/comments', async(addComment));

export default router;
