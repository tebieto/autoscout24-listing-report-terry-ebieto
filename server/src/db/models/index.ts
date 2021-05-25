import { Sequelize } from 'sequelize';
import { Credential } from '../../interfaces';

const env = process.env.NODE_ENV || 'development';
import dbConfig from'../config/index';

const config: Credential = dbConfig[env];

const  sequelize = new Sequelize(config.database, config.username, config.password, config.options);

const syncSequelize = async(): Promise<void> => {
	if(process.env.SYNC === 'yes') {
		try {
			await sequelize.sync({ force: true });
		} catch(error) {
			console.log(error);
		}
	}
};

export { Sequelize, sequelize, syncSequelize };