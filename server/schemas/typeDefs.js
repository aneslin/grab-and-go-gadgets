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
    borrower: User
    dueDate: String
  }

  input ItemInput {
    name: String!
    image: String!
    description: String

  }

  input UserInput{
    username: String!
    email: String!
    password: String!
    userType: UserType!

  }

  type Query{
      me: User
      users: [User]
      user(_id:ID!): User
      item(_id:ID!): Item
      items: [Item]

  }
  type Mutation {
      login(email:String!, password:String!): Auth
      createUser(user:UserInput!): Auth
      createItem(item:ItemInput!) : Item
      promoteUser(userId:ID!, userType:String!): User
      itemCheck(itemId:ID!, borrower:User, dueDate:String!): User
      returnItem(itemId:ID!)

  }

`;

module.exports = typeDefs;
