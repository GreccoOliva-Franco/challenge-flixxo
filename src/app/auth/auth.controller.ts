import { Request, Response } from 'express';
import httpCodes from 'http-status-codes';

import { IAuthSignUpCredentials } from './interfaces/auth.interface';

import { AuthService } from './auth.service';

import { UserAlreadyExistsError, UserInvalidCredentialsError } from '../../common/errors/users/user.error';
import { AuthTokenExpiredError, AuthTokenInvalidError } from '../../common/errors/auth/auth.error';
import { ErrorLogger } from '../../common/loggers/error.logger';

export class AuthController {
	constructor() { };

	static async signUp(req: Request, res: Response): Promise<Response> {
		try {
			const { username, email, password } = req.body as IAuthSignUpCredentials;

			await AuthService.signUp({ username, email, password });

			const response = { success: true };

			return res.status(httpCodes.CREATED).json(response);
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) return res.status(httpCodes.BAD_REQUEST).json({ error: error.message });

			ErrorLogger.logUncaughtError(error)
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	}

	static async signIn(req: Request, res: Response): Promise<Response> {
		try {
			const { username, email, password } = req.body as IAuthSignUpCredentials;

			const tokens = await AuthService.signIn({ username, email, password });

			return res.status(httpCodes.OK).json(tokens);
		} catch (error) {
			if (error instanceof UserInvalidCredentialsError) return res.status(httpCodes.UNAUTHORIZED).json({ error: error.errors });

			ErrorLogger.logUncaughtError(error)
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	};

	static async refreshTokens(req: Request, res: Response): Promise<Response> {
		try {
			const { refreshToken } = req.body;

			const tokens = await AuthService.refreshTokens(refreshToken);

			return res.status(httpCodes.OK).json(tokens);
		} catch (error) {
			if (error instanceof AuthTokenExpiredError) return res.status(httpCodes.UNAUTHORIZED).json({ error: error.message });
			if (error instanceof AuthTokenInvalidError) return res.status(httpCodes.UNAUTHORIZED).json({ error: error.message });

			ErrorLogger.logUncaughtError(error)
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json();
		}
	}
}

export default new AuthController();
