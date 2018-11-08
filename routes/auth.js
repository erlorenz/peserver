import { Router } from 'express';
import loginController from '../controllers/login';

const router = new Router();

// Login Route
router.post('/login', loginController);

// Potential Logout Blacklist Route
//

export default router;
