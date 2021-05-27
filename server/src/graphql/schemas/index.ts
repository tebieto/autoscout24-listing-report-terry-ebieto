import { gql } from 'apollo-server-express';
import { reportTypeDefs } from './reports';

const typeDefs = gql`
    ${reportTypeDefs}
`;

export default typeDefs;