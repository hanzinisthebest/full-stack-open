const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    user: User
  }

  type User {
    id: ID!
    username: String!
    token: String
  }

  type Query {
    todos: [Todo]
    users: [User]

    getCurrentUser: User
  }

  type Mutation {
    addTodo(title: String!): Todo
    updateTodo(id: ID!, completed: Boolean!): Todo
    deleteTodo(id: ID!): Boolean

    register(username: String!, password: String!): User
    login(username: String!, password: String!): User
    deleteUser(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
