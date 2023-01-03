import { Request, Response, Router } from "express";

import userController from "./user.controller";

const router = Router();

router.get('/', userController.find)
router.delete('/', userController.delete)

router.get('/:userId', userController.findProfileUserById);

export default router;
