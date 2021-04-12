  const {gql} = require('apollo-server');

  const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    email: String
    creado: String
  }

  type Token{
    token: String
  }

  input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
  }
  input ValidarInput{
    email: String!
    password: String!
  }

  type Query {
    obtenerUsuario(token:String!): Usuario
  }

  type Mutation {
    nuevoUsuario(input: UsuarioInput): Usuario
    validarUsuario(input: ValidarInput): Token
  }
  `;

  module.exports= typeDefs;