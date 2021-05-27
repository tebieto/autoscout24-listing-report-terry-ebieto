import express from 'express';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { router } from './router';
import * as dotenv from 'dotenv';
import graphQLServer from './graphql';

if (process.env.NODE_ENV !== 'production') dotenv.config();

/**
 * App Variables
 */
const app = express();

/**
 *  App Configuration
 */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

/**
 * Adding a REST API endpoint and a GraphQL Server
 * I'll use REST endpoints for POST Requests i.e uploading files
 * And I'll use GraphQL for Queries
 * See GraphQL resolvers and schemas in the 'graphql' directory
 * open /graphl in web browser to see docs, schemas and run test queries
 */ 
app.use('/api', router);
graphQLServer.applyMiddleware({ app });

/**
 * Serve react frontend
 */
app.use(express.static(path.join(__dirname, '../../client/build')));
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

export default app;
