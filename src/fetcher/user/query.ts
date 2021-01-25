import { gql } from 'graphql-request'

export const userQuery = gql`
  query userUuid($id: Int) {
    uuid(id: $id) {
      __typename
      id
      trashed

      ... on User {
        username
        date
        lastLogin
        description
        activeReviewer
        activeAuthor
        activeDonor
      }
    }
  }
`
