// These types are auto-generated from the GraphQL schema
import { gql } from 'graphql-request'

import { basicUserDataFragment } from '../user/query-by-username'

export const unrevisedEntitiesFragment = gql`
  fragment unrevisedEntitiesData on AbstractEntityConnection {
    nodes {
      __typename
      id
      alias
      ... on AbstractEntity {
        currentRevision {
          title
          id
        }
        revisions(unrevised: true) {
          nodes {
            title
            id
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
    }
    totalCount
    pageInfo {
      hasNextPage
      endCursor
    }
  }

  ${basicUserDataFragment}
`

export const unrevisedRevisionsSubjectsQuery = gql`
  query unrevisedRevisions($instance: Instance!) {
    authorization
    subject {
      subjects(instance: $instance) {
        id
        taxonomyTerm {
          name
        }
        unrevisedEntities {
          ...unrevisedEntitiesData
        }
      }
    }
  }
  ${unrevisedEntitiesFragment}
`
