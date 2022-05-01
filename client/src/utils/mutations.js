import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
# add usetype as a string
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      _id
      username
      email
      userType
    }
  }
}
`;


export const RESERVE_ITEM = gql`
mutation reserveItem($itemId: ID!, $dueDate: String!) {
  reserveItem(itemId: $itemId, dueDate: $dueDate) {
    _id
    username
    reservedItems {
      _id
      name
    }
    email
    userType
  }
}`


