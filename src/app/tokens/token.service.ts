import tokenHistoryService from "./modules/token-history/token-history.service";

import { Token } from "./token.entity";
import tokenRepository from "./token.repository";

import { TokenCreateDto, TokenUpdateDto } from "./dtos/token.dto";

import { TokenQueryFilter } from "./interfaces/token.interface";

import { TokenAlreadyExistsError } from "../../common/errors/tokens/token.error";

export class TokenService {
	constructor() { }

	async find(queryFilter: TokenQueryFilter): Promise<Token[]> {
		try {
			const tokens = await tokenRepository.find(queryFilter);

			return tokens;
		} catch (error) {
			throw error;
		}
	};

	async findById(tokenId: string): Promise<Token | null> {
		try {
			const token = await tokenRepository.findOneBy({ id: tokenId });

			return token;
		} catch (error) {
			throw error;
		}
	}

	async create(data: TokenCreateDto): Promise<Token> {
		try {
			const token = await tokenRepository.save(data);
			data.name = data.name.toLowerCase();

			await tokenHistoryService.create({ tokenId: token.id, price: token.price });

			return token;
		} catch (error) {
			if (error.code === 'ER_DUP_ENTRY') throw new TokenAlreadyExistsError();

			throw error;
		}
	}

	async updateById(tokenId: string, update: TokenUpdateDto): Promise<Token | null> {
		try {
			if (update.name) update.name = update.name.toLowerCase();

			await tokenRepository.update({ id: tokenId }, update)

			const token = await tokenRepository.findOneBy({ id: tokenId });
			if (!token) return null;

			await tokenHistoryService.create({ tokenId: token.id, price: token.price });

			return token;
		} catch (error) {
			throw error;
		}
	}

	async deleteAll(): Promise<void> {
		try {
			await tokenRepository.delete({});
		} catch (error) {
			throw error;
		}
	}
}

export default new TokenService();
