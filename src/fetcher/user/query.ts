import { gql } from 'graphql-request'

export const sharedUserFragments = gql`
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

export const basicUserDataFragment = gql`
  fragment basicUserData on User {
    id
    username
    isActiveAuthor
    isActiveDonor
    isActiveReviewer
    isNewAuthor
  }
`

export const userQuery = gql`
  query userUuid($path: String!, $instance: Instance!) {
    authorization
    uuid(alias: { path: $path, instance: $instance }) {
      ... on User {
        id
        __typename
        trashed
        ...userData
      }
    }
  }

  ${sharedUserFragments}
`
