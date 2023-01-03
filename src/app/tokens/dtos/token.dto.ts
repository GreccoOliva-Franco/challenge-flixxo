import { } from 'class-validator'
import { IToken } from '../interfaces/token.interface'

export class TokenCreateDto {
	name: string;
	symbol: string;
	marketCap: number;
	price: number;
}

export class TokenUpdateDto {

}
