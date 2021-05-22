/**
 * Required External Modules
 */

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';

import { routes } from './router';
import * as dotenv from 'dotenv';
import graphQLServer from './graphql';

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
app.use(compression());
app.use(express.json());
/**
 * Adding a REST API endpoint and a GraphQL Server
 * I'll use the graphQL endpoint mainly for get requests(Queries)
 * REST endpoints will be made available for both GET and POST requests
 * I usually prefer REST APIs for file uploads and GraphQL for other forms of Query or Mutations 
 */
app.use('/api', routes);
//graphQLServer.applyMiddleware({ app });


app.get('/', (req, res) => {
	res.send('Working perfectly alright!');
});

/**
 * Server Activation
 */

app.listen(port, () => {
	console.log(`The application is listening on port ${port}!`);
});