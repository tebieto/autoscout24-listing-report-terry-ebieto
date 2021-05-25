/**
 * Required External Modules
 */
import express from 'express';
import cors from 'cors';
import compression from 'compression';

import { route } from './router';
import * as dotenv from 'dotenv';
import graphQLServer from './graphql';
import { syncSequelize } from './db/models';

if (process.env.NODE_ENV !== 'production') dotenv.config();

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || 5000;

/**
 *  App Configuration
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

/**
 * Adding a REST API endpoint and a GraphQL Server
 * I'll use the graphQL endpoint mainly for get requests(Queries)
 * And I'll use GraphQL for Queries
 */
app.use('/api', route);
graphQLServer.applyMiddleware({ app });

/**
 * Sync Sequelize Models on server start
 */
syncSequelize();

/**
 * Server Activation
 */
app.listen(port, () => {
	console.log(`The application is listening on port ${port}!`);
});