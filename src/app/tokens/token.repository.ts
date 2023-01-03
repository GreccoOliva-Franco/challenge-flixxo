import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../infrastractures/database'
import { Token } from './token.entity';

export class TokenRepository extends Repository<Token> {
	constructor(target: EntityTarget<Token>, database: DataSource) {
		super(target, database.manager);
	}
}

export default new TokenRepository(Token, database);
