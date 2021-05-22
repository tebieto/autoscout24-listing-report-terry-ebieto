/**
 * Required External Modules
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { routes } from './router';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') dotenv.config();

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || 5000;

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api', routes);


app.get('/', (req, res) => {
	res.send('Working perfectly alright!');
});

/**
 * Server Activation
 */

app.listen(port, () => {
	console.log(`The application is listening on port ${port}!`);
});