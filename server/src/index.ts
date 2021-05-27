import app from './app';
import { syncSequelize } from './db/models';

/**
 * Sync Sequelize Models on server start
 */
syncSequelize();

/**
 * Activate Server
 */

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`The application is listening on port ${port}!`);
});