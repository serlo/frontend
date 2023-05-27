import { gql } from 'graphql-request'

import {
  sharedExerciseFragments,
  sharedLicenseFragments,
  sharedRevisionFragments,
  sharedTaxonomyParents,
} from '../query-fragments'

export const revisionQuery = gql`
  query RevisionUuid($id: Int) {
    authorization
    uuid(id: $id) {
      ... on AbstractRevision {
        __typename
        id
        alias
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
          ...taxonomyTermsV2
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
          ...taxonomyTermsV2
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
          ...taxonomyTermsV2
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
            alias
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
            ...taxonomyTermsV2
            revisions(unrevised: true) {
              totalCount
            }
            id
            currentRevision {
              title
            }
            pages(trashed: false, hasCurrentRevision: true) {
              id
              alias
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
          ...taxonomyTermsV2
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
          ...taxonomyTermsV2
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
            alias
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
          ...taxonomyTermsV2
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
          ...taxonomyTermsV2
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

  fragment taxonomyTermsV2 on AbstractTaxonomyTermChild {
    taxonomyTerms {
      nodes {
        ...pathToRoot
      }
    }
  }

  fragment courseRevision on CourseRevision {
    alias
    content
    title
    metaDescription
  }

  ${sharedTaxonomyParents}
  ${sharedLicenseFragments}
  ${sharedExerciseFragments}
  ${sharedRevisionFragments}
`
