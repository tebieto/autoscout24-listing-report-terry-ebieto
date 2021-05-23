"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
var resolvers_1 = __importDefault(require("./resolvers"));
var schemas_1 = __importDefault(require("./schemas"));
var graphQLServer = new apollo_server_express_1.ApolloServer({
    typeDefs: schemas_1.default,
    resolvers: resolvers_1.default,
    playground: {
        endpoint: '/graphql',
    }
});
exports.default = graphQLServer;
