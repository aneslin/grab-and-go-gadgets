const { gql } = require("apollo-server-express");
//dudeate is listed as a string- we will have to do parsing to do date operations
//all user query should first check the ME to see if the person is authorized
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    reservedItems: [Item]
    userType: UserType
  }

  enum UserType {
    CLIENT
    ADMIN
  }

  type Auth {
    token: ID!
    user: User
  }

  type Item {
    _id: ID!
    name: String!
    image: String!
    description: String
    borrower: [User]
    dueDate: String
  }

  input Item {
    name: String!
    image: String!
    description: String

  }

  input User{
    username: String!
    email: String!
    password: String!
    userType: UserType

  }

  type Query{
      me: User
      users: [User]
      user(_id:ID!): User
      item(_id:ID!): Item
      items: [Item]

  }
`;

module.exports = typeDefs;
