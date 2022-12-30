import { Router } from 'express';

import authRoutes from './auth/auth.routes';
import testRoutes from './tests/test.routes';

const router = Router();

router.use('/tests', testRoutes);
router.use('/auth', authRoutes);

export default router;
