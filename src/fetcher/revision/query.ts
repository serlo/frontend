// These types are auto-generated from the GraphQL schema
import { gql } from 'graphql-request'

import {
  sharedExerciseFragments,
  sharedLicenseFragments,
  sharedRevisionFragments,
} from '../query-fragments'

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
          isActiveAuthor
          isActiveDonor
          isActiveReviewer
        }

        ... on ArticleRevision {
          ...articleRevision
          changes
          repository {
            ...taxonomyTerms
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              ...articleRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
        ... on PageRevision {
          ...pageRevision
          repository {
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              ...pageRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
        ... on AppletRevision {
          ...appletRevision
          changes
          repository {
            ...taxonomyTerms
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              ...appletRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
        ... on CourseRevision {
          ...courseRevision
          changes
          repository {
            ...taxonomyTerms
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              ...courseRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
        ... on CoursePageRevision {
          ...coursePageRevision
          changes
          repository {
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              ...coursePageRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
            course {
              ...taxonomyTerms
            }
          }
        }
        ... on EventRevision {
          ...eventRevision
          changes
          repository {
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              ...eventRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
        ... on ExerciseRevision {
          content
          changes
          repository {
            ...taxonomyTerms
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              content
            }
            license {
              id
              default
              title
            }
            solution {
              id
              currentRevision {
                content
              }
            }
          }
        }
        ... on GroupedExerciseRevision {
          content
          changes
          repository {
            ...license
            trashed
            instance
            id
            alias
            exerciseGroup {
              id
              exercises {
                id
              }
            }
            license {
              id
              default
              title
            }
            currentRevision {
              id
              content
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
        ... on ExerciseGroupRevision {
          ...exerciseGroupRevision
          changes
          cohesive
          repository {
            ...license
            trashed
            instance
            id
            alias
            license {
              id
              default
              title
            }
            currentRevision {
              id
              ...exerciseGroupRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
            exercises {
              ...exercise
              revisions(unrevised: true) {
                totalCount
              }
            }
          }
        }
        ... on SolutionRevision {
          content
          changes
          repository {
            ...license
            trashed
            instance
            id
            alias
            exercise {
              __typename
              ... on Exercise {
                id
              }
              ... on GroupedExercise {
                id
                exerciseGroup {
                  id
                  exercises {
                    id
                  }
                }
              }
            }
            currentRevision {
              id
              content
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
        ... on VideoRevision {
          ...videoRevision
          changes
          repository {
            ...taxonomyTerms
            ...license
            trashed
            instance
            id
            alias
            currentRevision {
              id
              ...videoRevision
            }
            revisions(unrevised: false) {
              nodes {
                id
                trashed
              }
            }
          }
        }
      }
    }
  }

  ${sharedLicenseFragments}
  ${sharedExerciseFragments}
  ${sharedRevisionFragments}

  fragment courseRevision on CourseRevision {
    content
    title
    metaDescription
  }

  fragment path on Navigation {
    path {
      nodes {
        label
        url
      }
    }
  }

  fragment taxonomyTerms on AbstractTaxonomyTermChild {
    taxonomyTerms {
      nodes {
        navigation {
          ...path
        }
      }
    }
  }
`
