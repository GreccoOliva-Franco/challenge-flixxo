import { Token } from "../../../token.entity";

export interface TokenHistoryRegister {
	tokenId: string;
	price: number;
}

export interface ITokenHistory extends TokenHistoryRegister {
	createdAt: Date;
}
