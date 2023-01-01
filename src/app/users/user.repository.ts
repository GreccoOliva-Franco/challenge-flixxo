import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../infrastractures/database';

import { User } from './user.entity';

import { IUserRepositoryImplementation } from './interfaces/user.interface'


export class UserRepository extends Repository<User> implements IUserRepositoryImplementation {
	static instance: UserRepository;

	constructor(target: EntityTarget<User>, database: DataSource) {
		super(target, database.manager);
	}

	static getInstance(): UserRepository {
		if (!UserRepository.instance) UserRepository.instance = new UserRepository(User, database);

		return UserRepository.instance;
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
}

export default UserRepository.getInstance();
