import { Router } from 'express';
import loginController from '../controllers/login';
import async from '../middleware/async';

const router = new Router();

// Login Route
router.post('/login', async(loginController));

// Potential Logout Blacklist Route
//

export default router;
