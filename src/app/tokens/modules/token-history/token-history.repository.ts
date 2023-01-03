import { DataSource, EntityTarget, Repository } from 'typeorm';

import database from '../../../../infrastractures/database';
import { TokenHistory } from './token-history.entity';

export class TokenHistoryRepository extends Repository<TokenHistory> {
	constructor(target: EntityTarget<TokenHistory>, database: DataSource) {
		super(target, database.manager);
	}
}

export default new TokenHistoryRepository(TokenHistory, database);
