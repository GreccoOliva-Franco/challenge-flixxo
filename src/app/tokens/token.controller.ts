import { Request, Response } from "express";
import httpCodes from 'http-status-codes';

import tokenService from "./token.service";
import tokenHistoryService from "./modules/token-history/token-history.service";

import { TokenCreateDto, TokenUpdateDto } from "./dtos/token.dto";

import { TokenQueryFilter } from "./interfaces/token.interface";

import { ErrorLogger } from "../../common/loggers/error.logger";

import { TokenAlreadyExistsError } from "../../common/errors/tokens/token.error";

export class TokenController {
	constructor() { }

	async find(req: Request, res: Response): Promise<Response> {
		try {
			const queryFilter: TokenQueryFilter = req.query;

			const tokens = await tokenService.find(queryFilter);

			const response = {
				success: true,
				data: tokens,
			}

			return res.status(httpCodes.OK).json(response)
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false }
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response)
		}
	}

	async findById(req: Request, res: Response): Promise<Response> {
		try {
			const { tokenId } = req.params;

			const token = await tokenService.findById(tokenId!);

			const response = {
				success: true,
				data: token,
			}

			return res.status(httpCodes.OK).json(response)
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}

	async getPriceById(req: Request, res: Response): Promise<Response> {
		try {
			const { tokenId } = req.params;

			const token = await tokenService.findById(tokenId!);
			if (!token) return res.status(httpCodes.BAD_REQUEST).json({ success: false, message: "Token not found" });

			const response = {
				success: true,
				data: token.price,
			}

			return res.status(httpCodes.OK).json(response)
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}

	async getHistoryById(req: Request, res: Response): Promise<Response> {
		try {
			const { tokenId } = req.params;

			const history = await tokenHistoryService.findById(tokenId!);

			const response = {
				success: true,
				data: history,
			}

			return res.status(httpCodes.OK).json(response)
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const data = <TokenCreateDto>req.body;

			const token = await tokenService.create(data);

			const response = {
				success: true,
				data: token,
			};

			return res.status(httpCodes.CREATED).json(response);
		} catch (error) {
			if (error instanceof TokenAlreadyExistsError) return res.status(httpCodes.BAD_REQUEST).json({ success: false, message: error.message });

			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}

	async updateById(req: Request, res: Response): Promise<Response> {
		try {
			const { tokenId } = req.params;
			const dto = <TokenUpdateDto>req.body;

			const token = await tokenService.updateById(tokenId!, dto);
			if (!token) return res.status(httpCodes.BAD_REQUEST).json({ success: false, message: "Token not found" })

			const response = {
				success: true,
				data: token,
			}

			return res.status(httpCodes.OK).json(response);
		} catch (error) {
			ErrorLogger.logUncaughtError(error);

			const response = { success: false };
			return res.status(httpCodes.INTERNAL_SERVER_ERROR).json(response);
		}
	}
}

export default new TokenController();
