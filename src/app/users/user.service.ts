import bcrypt from 'bcrypt';
import { FindManyOptions, FindOptionsWhere } from 'typeorm';

import userRepository from './user.repository'
import { User } from './user.entity';

import { IAuthSignUpCredentials, IAuthSignInCredentials } from '../auth/interfaces/auth.interface';
import { UserAlreadyExistsError, UserInvalidCredentialsError } from '../../common/errors/users/user.error';

import { IErrorHint } from '../../common/errors/interfaces/error.interface';

export class UserService {
	constructor() { }

	async find(criteria: FindManyOptions<User>): Promise<User[] | null> {
		return userRepository.find(criteria);
	}

	async findOneBy(criteria: FindOptionsWhere<User>): Promise<User | null> {
		return userRepository.findOneBy(criteria);
	}

	async create(credentials: IAuthSignUpCredentials): Promise<User> {
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

	async deleteMany(criteria: FindOptionsWhere<User>): Promise<void> {
		await userRepository.delete(criteria);
	}

	private validateUserFields(users: User[], { username }): IErrorHint[] {
		const errors = users.reduce((acc: IErrorHint[], user: User) => {
			if (user.username === username) acc.push({ field: 'username', message: 'Username already in use' });
			// if (user.email === email) acc.push({ field: 'email', message: 'Email already in use' });

			return acc;
		}, []);

		return errors;
	}

	async validateCredentials(credentials: IAuthSignInCredentials): Promise<User> {
		const { username, password: inputPassword } = credentials;

		const user = await userRepository.findPasswordByUsername(username);
		if (!user) throw new UserInvalidCredentialsError();

		const isValidPassword = await this.isValidPassword(inputPassword, user);
		if (!isValidPassword) throw new UserInvalidCredentialsError();

		return user;
	}

	private async isValidPassword(password: string, user: User): Promise<boolean> {
		const isSamePassword = await bcrypt.compare(password, user.password);

		return isSamePassword;
	}
}

export default new UserService();
