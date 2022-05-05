import { gql } from '@apollo/client';



export const QUERY_ME = gql`
 query me {
  me {
    _id
    username
    email
    reservedItems {
      _id
      name
      image
      description
      dueDate
      itemStatus
    }
    userType
  }
}`


export const QUERY_ITEMS = gql`
query Items {
  items {
    _id
    name
    image
    description
    dueDate
    itemStatus
  }
}
`

export const QUERY_USERS = gql`
query Users {
  users {
    _id
    username
    email
    reservedItems {
      image
      _id
      name
      description
      dueDate
      itemStatus
    }
    userType
  }
}
`