import { Request, Response, Router } from "express";
import httpCodes from 'http-status-codes';

import userController from "./user.controller";

import { AuthMiddleware } from "../auth/middlewares/auth.middleware";

const router = Router();
router.get('/', userController.find)
router.delete('/', userController.delete)

router.get('/:userId', userController.findProfileUserById);

export default router;
