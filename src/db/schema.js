const { gql } = require("apollo-server");

const typeDefs = gql`
  type Usuario {
    id: ID
    nombre: String
    email: String
    creado: String
  }

  type Token {
    token: String
  }

  type Material {
    id: ID
    nombre: String
    stock: Int
    creado: String
  }

  input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
  }
  input ValidarInput {
    email: String!
    password: String!
  }
  input MaterialInput {
    nombre: String!
    stock: Int!
  }

  type Query {
    obtenerUsuario(token: String!): Usuario
  }

  type Mutation {
    #USUARIOS
    nuevoUsuario(input: UsuarioInput): Usuario
    validarUsuario(input: ValidarInput): Token

    #MATERIALES
    nuevoMaterial(input: MaterialInput): Material
  }
`;

module.exports = typeDefs;
