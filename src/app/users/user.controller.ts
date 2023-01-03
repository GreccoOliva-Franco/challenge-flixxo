import { Request, Response } from "express";
import httpCodes from "http-status-codes";
import { ErrorLogger } from "../../common/loggers/error.logger";

import userService, { UserService } from "./user.service";

export class UserController {
	constructor(private readonly services) { }

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const queryFilter = req.query;

			const users = await userService.find(queryFilter);

			const response = {
				success: true,
				data: users,
			}
			return res.status(httpCodes.OK).json(response);
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}

	async findProfileUserById(req: Request, res: Response): Promise<Response> {
		try {
			const { userId } = req.params;

			const user = await this.services.users.findProfileById(userId!);

			return res.status(httpCodes.OK).json(user);
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}

	async delete(req: Request, res: Response): Promise<Response> {
		try {
			const queryFilter = req.query;

			await userService.deleteMany(queryFilter);

			const response = { success: true };

			return res.status(httpCodes.OK).json(response);
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}
}

const services = { users: userService };

export default new UserController(services);
