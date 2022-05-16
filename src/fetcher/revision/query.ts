import { gql } from 'graphql-request'

import {
  sharedExerciseFragments,
  sharedLicenseFragments,
  sharedPathFragments,
  sharedRevisionFragments,
} from '../query-fragments'

export const revisionQuery = gql`
  query RevisionUuid($id: Int) {
    authorization
    uuid(id: $id) {
      ... on AbstractRevision {
        __typename
        id
        trashed
        date
        author {
          id
          username
          isActiveAuthor
          isActiveDonor
          isActiveReviewer
        }
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
            totalCount
            nodes {
              id
              title
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
            totalCount
            nodes {
              id
              title
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
          pages {
            id
            currentRevision {
              id
              title
              content
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
            totalCount
            nodes {
              id
              title
              trashed
            }
          }
          course {
            ...taxonomyTerms
            revisions(unrevised: true) {
              totalCount
            }
            id
            currentRevision {
              title
            }
            pages(trashed: false, hasCurrentRevision: true) {
              alias
              id
              currentRevision {
                title
                trashed
              }
            }
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
            date
          }
          ...license
          solution {
            id
            currentRevision {
              content
            }
          }
          revisions(unrevised: false) {
            totalCount
            nodes {
              id
              trashed
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
            date
          }
          revisions(unrevised: false) {
            totalCount
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
            totalCount
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
            totalCount
            nodes {
              id
              title
              trashed
            }
          }
        }
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

  fragment courseRevision on CourseRevision {
    content
    title
    metaDescription
  }

  ${sharedPathFragments}
  ${sharedLicenseFragments}
  ${sharedExerciseFragments}
  ${sharedRevisionFragments}
`
