// These types are auto-generated from the GraphQL schema
import { gql } from 'graphql-request'

import { sharedRevisionFragments } from '../query-fragments'

export const revisionQuery = gql`
  query revisionUuid($id: Int) {
    authorization
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
              id
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
              id
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
              id
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
              id
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
              id
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
              id
              content
            }
          }
        }
        ... on GroupedExerciseRevision {
          content
          changes
          repository {
            id
            license {
              id
              title
            }
            currentRevision {
              id
              content
            }
          }
        }
        ... on ExerciseGroupRevision {
          ...exerciseGroupRevision
          changes
          repository {
            id
            license {
              id
              title
            }
            currentRevision {
              id
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
              id
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
              id
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
