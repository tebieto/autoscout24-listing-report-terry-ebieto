import { reportsQueries } from './reports/index.queries';

const resolvers = {
	Query: {
		...reportsQueries,
	}
};

export default resolvers;