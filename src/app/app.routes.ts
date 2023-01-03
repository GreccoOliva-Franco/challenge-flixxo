import { Router } from 'express';

import authRoutes from './auth/auth.routes';
import testRoutes from './tests/test.routes';
import tokenRoutes from './tokens/token.routes';
import userRoutes from './users/user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tests', testRoutes);
router.use('/users', userRoutes);
router.use('/tokens', tokenRoutes);

export default router;
