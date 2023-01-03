import { Router } from 'express';

import authController from './auth.controller';

// import { AuthRegisterDto, AuthLoginDto } from './dtos/auth.dto';

const router = Router();

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.post('/refresh', authController.refreshTokens);

export default router;
