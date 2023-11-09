// These types are auto-generated from the GraphQL schema
import { gql } from 'graphql-request'

import { basicUserDataFragment } from '../user/query'

export const unrevisedEntitiesFragment = gql`
  fragment unrevisedEntitiesData on AbstractEntityConnection {
    nodes {
      __typename
      id
      alias
      ... on Applet {
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
      ... on Article {
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
      ... on Course {
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
      ... on CoursePage {
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
      ... on Event {
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
      ... on Exercise {
        currentRevision {
          id
        }
        revisions(unrevised: true) {
          nodes {
            id
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on ExerciseGroup {
        currentRevision {
          id
        }
        revisions(unrevised: true) {
          nodes {
            id
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on GroupedExercise {
        currentRevision {
          id
        }
        revisions(unrevised: true) {
          nodes {
            id
            author {
              ...basicUserData
            }
            changes
            date
          }
        }
      }
      ... on Video {
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
