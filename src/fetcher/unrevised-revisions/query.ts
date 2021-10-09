// These types are auto-generated from the GraphQL schema
import { gql } from 'graphql-request'

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
              ...authorData
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
              ...authorData
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
              ...authorData
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
              ...authorData
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
              ...authorData
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
              ...authorData
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
              ...authorData
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
              ...authorData
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
              ...authorData
            }
            changes
            date
          }
        }
      }
      ... on Solution {
        currentRevision {
          id
        }
        solutionRevisions: revisions(unrevised: true) {
          nodes {
            id
            author {
              ...authorData
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
  fragment authorData on User {
    id
    username
    isActiveAuthor
    isActiveDonor
    isActiveReviewer
    isNewAuthor
  }
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
