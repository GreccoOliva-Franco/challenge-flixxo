import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../infrastractures/database';

import { User } from './user.entity';

import { IUserRepositoryImplementation } from './interfaces/user.interface'


export class UserRepository extends Repository<User> implements IUserRepositoryImplementation {
	constructor(target: EntityTarget<User>, database: DataSource) {
		super(target, database.manager);
	}

	async findProfileByID(userId: string): Promise<User | null> {
		const profileFields = ['id', 'isVerifiedEmail', 'createdAt', 'username', 'email'];
		const user = await this
			.createQueryBuilder('user')
			.where('user.id = :userId', { userId })
			.select(profileFields)
			.getOne();

		return user;
	}

	async findPasswordByUsername(username: string): Promise<User | null> {
		const user = await this.createQueryBuilder('user')
			.where('user.username = :username', { username })
			.select(['user.id', 'user.password'])
			.getOne();

		return user;
	}
}

export default new UserRepository(User, database);
