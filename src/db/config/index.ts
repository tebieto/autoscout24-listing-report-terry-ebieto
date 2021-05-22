import { Credential, Credentials } from '../../interfaces/db';

const cred: Credential = {
	'username':  process.env.DB_USERNAME || '',
	'password':  process.env.DB_PASSWORD || '',
	'database': process.env.PGDATABASE || '',
	options: {
		'host': process.env.PGHOST || '',
		'dialect': 'postgres'
	}
};

const Config: Credentials = {
	'development': cred,
	'test': cred,
	'production': cred
};

export default Config;
