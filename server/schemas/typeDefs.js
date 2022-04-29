const { gql } = require("apollo-server-express");
//dudeate is listed as a string- we will have to do parsing to do date operations
//all user query should first check the ME to see if the person is authorized
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    reservedItems: [Item]
    userType: String

  }

enum itemStatus{
    AVAILABLE
    RESERVED
    CHECKED_OUT
}

  enum UserType {
    CLIENT
    ADMIN
  }

  type Auth {
    token: ID!
    user: User
    userType:String!
  }

  type Item {
    _id: ID!
    name: String!
    image: String!
    description: String
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
      createUser(username:String!, email:String!, password:String!, userType: UserType!): Auth
      createItem(name:String!, image:String!, description:String) : Item
     
      itemReserve(itemId:ID!,  dueDate:String!): User
      returnItem(itemId:ID!):Item

  }

`;

module.exports = typeDefs;
