import { Request, Response, NextFunction } from 'express';
import { Strategy } from 'passport-jwt'
import { resolve } from 'path';

import { AuthForbiddenError } from '../../../common/errors/auth/auth.error';

export class AuthMiddleware {
	// static authenticate(req: Request, res: Response, next: NextFunction): void {
	// 	return
	// }

	// static rbac(req: Request, res: Response, next: NextFunction): void | Response {
	// 	const targetUserId = req.params.userId!;
	// 	const { id: requesterUserId } = req.user!.id!;

	// 	if (userId !== id) return res.status(httpCode.FORBIDDEN).json(new AuthForbiddenError());

	// 	next();
	// }
}
