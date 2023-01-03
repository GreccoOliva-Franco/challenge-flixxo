import { UpdateResult } from "typeorm";
import { TokenCreateDto, TokenUpdateDto } from "./dtos/token.dto";
import { TokenQueryFilter } from "./interfaces/token.interface";
import { Token } from "./token.entity";
import tokenRepository, { TokenRepository } from "./token.repository";

export class TokenService {
	private readonly tokenRepository: TokenRepository;

	constructor() {
		this.tokenRepository = tokenRepository;
	}

	async find(queryFilter: TokenQueryFilter): Promise<Token[]> {
		try {
			const tokens = await this.tokenRepository.find(queryFilter);

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

	async create(tokenCreateDto: Omit<TokenCreateDto, 'price'>): Promise<Token> {
		try {
			const token = await tokenRepository.save(tokenCreateDto);

			return token;
		} catch (error) {
			throw error;
		}
	}

	async updateById(tokenId: string, update: TokenUpdateDto): Promise<Token | null> {
		try {
			await tokenRepository.update({ id: tokenId }, update)

			const token = tokenRepository.findOneBy({ id: tokenId });

			return token;
		} catch (error) {
			throw error;
		}
	}
}

export default new TokenService();
