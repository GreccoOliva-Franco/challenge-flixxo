import { } from 'class-validator'

export class TokenCreateDto {
	name: string;
	symbol: string;
	marketCap: number;
	price: number;
}

export class TokenUpdateDto {
	name?: string;
	symbol?: string;
	marketCap?: number;
	price?: number;
}
