const { gql } = require("apollo-server-express");

const typeDefs = gql`{

    type User: {
        _id: ID!
        username: String!
        email:String!
        reservedItems:[String]
        userType: UserType
}

    enum UserType: {
        CLIENT
        ADMIN
}

type Auth: {
    token: ID!
    user: User
}




}`;

module.exports = typeDefs;
