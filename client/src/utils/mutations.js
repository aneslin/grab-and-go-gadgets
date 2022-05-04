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
    name
    image
    description
    dueDate
    itemStatus
    _id
  }
}`

export const CREATE_ITEM = gql`
mutation createItem($name: String!, $image: String!, $description: String) {
  createItem(name: $name, image: $image, description: $description) {
    name
    image
    description
  }
}
`

export const ALTER_USER = gql`
mutation alterUser($username: String!, $userType: UserType!) {
  alterUser(username: $username, userType: $userType) {
    username
    userType
  }
}
`
export const RETURN_ITEM = gql`
mutation ReturnItem($itemId: ID!, $username: String!) {
  returnItem(itemId: $itemId, username: $username) {
  
    username
    reservedItems {
      name
      _id
    }
  }
}
`



