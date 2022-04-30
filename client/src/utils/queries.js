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