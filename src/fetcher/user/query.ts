import { gql } from 'graphql-request'

export const userQuery = gql`
  query userUuid($path: String!, $instance: Instance!) {
    uuid(alias: { path: $path, instance: $instance }) {
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
