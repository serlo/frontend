// These types are auto-generated from the GraphQL schema
import { gql } from 'graphql-request'

import { sharedRevisionFragments } from '../query-fragments'

export const revisionQuery = gql`
  query revisionUuid($id: Int) {
    uuid(id: $id) {
      __typename
      id
      trashed

      ... on AbstractRevision {
        date
        author {
          id
          username
          activeAuthor
          activeDonor
          activeReviewer
        }
        ... on ArticleRevision {
          ...articleRevision
          changes
          repository {
            id
            currentRevision {
              id
              ...articleRevision
            }
          }
        }
        ... on PageRevision {
          ...pageRevision
          repository {
            id
            currentRevision {
              ...pageRevision
            }
          }
        }
        ... on AppletRevision {
          ...appletRevision
          changes
          repository {
            id
            currentRevision {
              ...appletRevision
            }
          }
        }
        ... on CourseRevision {
          ...courseRevision
          changes
          repository {
            id
            currentRevision {
              ...courseRevision
            }
          }
        }
        ... on CoursePageRevision {
          ...coursePageRevision
          changes
          repository {
            id
            currentRevision {
              ...coursePageRevision
            }
          }
        }
        ... on EventRevision {
          ...eventRevision
          changes
          repository {
            id
            currentRevision {
              ...eventRevision
            }
          }
        }
        ... on ExerciseRevision {
          content
          changes
          repository {
            id
            currentRevision {
              content
            }
          }
        }
        ... on GroupedExerciseRevision {
          content
          changes
          repository {
            id
            currentRevision {
              content
            }
          }
        }
        ... on ExerciseGroupRevision {
          ...exerciseGroupRevision
          changes
          repository {
            id
            currentRevision {
              ...exerciseGroupRevision
            }
          }
        }
        ... on SolutionRevision {
          content
          changes
          repository {
            id
            currentRevision {
              content
            }
          }
        }
        ... on VideoRevision {
          ...videoRevision
          changes
          repository {
            id
            currentRevision {
              ...videoRevision
            }
          }
        }
      }
    }
  }

  ${sharedRevisionFragments}

  fragment courseRevision on CourseRevision {
    content
    title
    metaDescription
  }
`
