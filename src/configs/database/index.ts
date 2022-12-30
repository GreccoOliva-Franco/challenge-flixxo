import dotenv from 'dotenv';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import enviromentConfig from "../enviroment"

dotenv.config({ path: enviromentConfig.path })

let host: string;
if (process.env.DEPLOY_CONFIG === 'docker') host = process.env.DATABASE_HOST_DOCKER!;
if (process.env.DEPLOY_CONFIG === 'local') host = process.env.DATABASE_HOST_LOCAL!;

const databaseConfig: MysqlConnectionOptions = {
	type: 'mysql',
	host: host!,
	port: parseInt(process.env.DATABASE_PORT!),
	username: process.env.DATABASE_USERNAME!,
	password: process.env.DATABASE_PASSWORD!,
	database: process.env.DATABASE_NAME!,
	entities: ['dist/app/**/entities/*.entity.js'],
	subscribers: ['dist/app/**/entities/*.subscriber.js'],
	synchronize: true,
	logging: false,
}

export default databaseConfig;
