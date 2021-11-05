import { gql } from 'graphql-request'

export const sharedUserFragment = gql`
  fragment userData on User {
    username
    date
    lastLogin
    description
    isActiveReviewer
    isActiveAuthor
    isActiveDonor
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
`

export const userQuery = gql`
  query userUuid($path: String!, $instance: Instance!) {
    authorization
    uuid(alias: { path: $path, instance: $instance }) {
      __typename
      id
      trashed

      ... on User {
        ...userData
      }
    }
  }

  ${sharedUserFragment}
`
