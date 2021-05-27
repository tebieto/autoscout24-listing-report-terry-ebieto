import { Credential, Credentials } from '../../interfaces';
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') dotenv.config();

const cred: Credential = {
	'username':  process.env.DB_USERNAME || '',
	'password':  process.env.DB_PASSWORD || '',
	'database': process.env.PGDATABASE || '',
	'dialect': 'postgres',
	options: {
		'host': process.env.PGHOST || '',
		'dialect': 'postgres',
	}
};

const config: Credentials = {
	'development': cred,
	'test': cred,
	'production': { ...cred, database: process.env.PGDATABASE || '' }
};
export default config;
