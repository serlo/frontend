import { gql } from 'graphql-request'

import { sharedUserFragments } from './query'

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
