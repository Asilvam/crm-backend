const { ApolloServer, gql } = require("apollo-server");
const typeDefs = require("./db/schema");
const resolvers = require("./db/resolvers");
require("dotenv").config({ path: ".env" });

const conexionDB = require('./config/db');

conexionDB();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen({port: process.env.PORT}).then(({ url }) => {
  console.log(`Servidor listo en URL ${url}`);
});
