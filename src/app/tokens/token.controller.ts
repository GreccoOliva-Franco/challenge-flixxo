import { Request, Response } from "express";
import httpCodes from 'http-status-codes';

import tokenService, { TokenService } from "./token.service";

import { TokenCreateDto, TokenUpdateDto } from "./dtos/token.dto";

import { TokenQueryFilter } from "./interfaces/token.interface";

import { ErrorLogger } from "../../common/loggers/error.logger";

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

	async create(req: Request, res: Response): Promise<Response> {
		try {
			const { price, ...dto } = <TokenCreateDto>req.body;

			const token = await tokenService.create(<Omit<TokenCreateDto, "price">>dto);

			// await tokenHistoryService.create({ tokenId: token.id, price });

			const response = {
				success: true,
				data: token,
			};

			return res.status(httpCodes.CREATED).json(response);
		} catch (error) {
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
