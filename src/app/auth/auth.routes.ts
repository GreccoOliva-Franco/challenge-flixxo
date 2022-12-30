import { Router } from 'express';

import { AuthController } from './auth.controller';

// import { AuthRegisterDto, AuthLoginDto } from './dtos/auth.dto';

const router = Router();

router.post('/signup', AuthController.signUp);
// router.post('/signin', AuthController.signIn);
// router.post('/refresh', makeValidateBody(AuthRefreshDto), AuthController.refreshToken);

export default router;
