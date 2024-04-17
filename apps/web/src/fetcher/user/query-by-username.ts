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

export const userByUsernameQuery = gql`
  query userByUsername($username: String!) {
    authorization
    user {
      userByUsername(username: $username) {
        id
        __typename
        trashed
        ...userData
      }
    }
  }

  ${sharedUserFragments}
`
