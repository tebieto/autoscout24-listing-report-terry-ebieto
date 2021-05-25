import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './schemas';
const graphQLServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: {
		endpoint: '/graphql',
	}
});

export default graphQLServer;