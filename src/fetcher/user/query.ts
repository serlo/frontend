import { gql } from 'graphql-request'

export const userQuery = gql`
  query userUuid($path: String!, $instance: Instance!) {
    authorization
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
        chatUrl
        imageUrl
        motivation
        roles {
          nodes {
            scope
            role
          }
        }
        activityByType {
          edits
          comments
          reviews
          taxonomy
        }
      }
    }
  }
`
