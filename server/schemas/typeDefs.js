const { gql } = require("apollo-server-express");
//dudeate is listed as a string- we will have to do parsing to do date operations
const typeDefs = gql`{

    type User: {
        _id: ID!
        username: String!
        email:String!
        reservedItems:[Item]
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

type Item: {
    _id:ID!
    name:String!
    image:String!
    description:String
    borrower:[User]
    dueDate: String
}


}`;

module.exports = typeDefs;
