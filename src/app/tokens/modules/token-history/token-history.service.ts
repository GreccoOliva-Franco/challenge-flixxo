import tokenHistoryRepository from "./token-history.repository";

import { TokenHistory } from "./token-history.entity";
import { ITokenHistory, TokenHistoryRegister } from "./interfaces/token-history.interface";

export class TokenHistoryService {
	constructor() { }

	async findById(tokenId: string): Promise<TokenHistory[] | null> {
		try {
			const history = await tokenHistoryRepository
				.createQueryBuilder("tokenHistory")
				.where("tokenHistory.tokenId = :tokenId", { tokenId })
				.orderBy("tokenHistory.createdAt", "DESC")
				.getMany();

			return history;
		} catch (error) {
			throw error;
		}
	}

	async create({ tokenId, price }: any): Promise<TokenHistory> {
		try {
			const history = await tokenHistoryRepository.save({ tokenId, price });

			return history;
		} catch (error) {
			throw error;
		}
	}
}

export default new TokenHistoryService();
