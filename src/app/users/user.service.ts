import bcrypt from 'bcrypt';
import { FindOptionsWhere } from 'typeorm';

import userRepository from './user.repository'
import { User } from './user.entity';

import { IAuthSignUpCredentials, IAuthSignInCredentials } from '../auth/interfaces/auth.interface';
import { UserAlreadyExistsError, UserInvalidCredentialsError } from '../../common/errors/users/user.error';

import { IErrorHint } from '../../common/errors/interaces/error.interface';

export class UserService {
	constructor() { }

	static async findOneBy(criteria: FindOptionsWhere<User>): Promise<User | null> {
		return userRepository.findOneBy(criteria);
	}

	static async create(credentials: IAuthSignUpCredentials): Promise<User> {
		try {
			const { username, password } = credentials;

			const users = await userRepository.find({ where: { username } });
			const validationErrors = this.validateUserFields(users, { username });
			if (validationErrors.length) throw new UserAlreadyExistsError(validationErrors);

			const user = await userRepository.save({ username, password });

			return user;
		} catch (error) {
			if (error instanceof UserAlreadyExistsError) throw error;

			throw error;
		}
	};

	private static validateUserFields(users: User[], { username }): IErrorHint[] {
		const errors = users.reduce((acc: IErrorHint[], user: User) => {
			if (user.username === username) acc.push({ field: 'username', message: 'Username already in use' });
			// if (user.email === email) acc.push({ field: 'email', message: 'Email already in use' });

			return acc;
		}, []);

		return errors;
	}

	static async validateCredentials(credentials: IAuthSignInCredentials): Promise<User> {
		const { username, password } = credentials;

		const user = await userRepository.findOneBy({ username });

		if (!user) throw new UserInvalidCredentialsError();

		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) throw new UserInvalidCredentialsError();

		return user;
	}
}
