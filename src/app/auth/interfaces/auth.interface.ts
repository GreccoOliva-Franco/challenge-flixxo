import { Request, Response } from "express";

export interface IAuthController {
	signUp: (req: Request, res: Response) => Promise<Response>;
	signIn: (req: Request, res: Response) => Promise<Response>;
	refreshTokens: (req: Request, res: Response) => Promise<Response>;
}

export interface IAuthService {
	registerNewUser: (credentials: IAuthSignUpCredentials) => Promise<void>;
	login: (credentials: IAuthSignUpCredentials) => Promise<IAuthTokens>;
}

export interface IAuthSignUpCredentials {
	username: string;
	email: string;
	password: string;
}

export interface IAuthTokens {
	[key: string]: string
}

export interface IAuthTokenPayload {
	userId: string;
	username?: string;
}
