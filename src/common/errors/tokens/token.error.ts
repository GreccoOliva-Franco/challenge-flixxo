import { CustomError } from "../custom.error";

const prefix = 'tokens-E00-';

export class TokenAlreadyExistsError extends CustomError {
	constructor() {
		const name = 'TokenAlreadyExistsError';
		const message = 'Token already exists';
		const internalCode = `${prefix}000`;
		super({ name, message, internalCode });
	}
}
