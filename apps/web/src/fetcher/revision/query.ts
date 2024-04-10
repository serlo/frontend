import { gql } from 'graphql-request'

import {
  sharedRevisionFragments,
  sharedTaxonomyParents,
} from '../query-fragments'

export const revisionQuery = gql`
  query RevisionUuid($id: Int) {
    authorization
    uuid(id: $id) {
      ... on AbstractRevision {
        __typename
        title
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
      ... on AbstractEntityRevision {
        changes
      }
      ... on ArticleRevision {
        ...articleRevision
        repository {
          ...taxonomyTermsV2
          licenseId
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
        ...anyRevision
        repository {
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
            ...anyRevision
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
      ... on AppletRevision {
        ...appletRevision
        repository {
          ...taxonomyTermsV2
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
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
        ...anyRevision
        repository {
          ...taxonomyTermsV2
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
            ...anyRevision
          }
          revisions(unrevised: false) {
            totalCount
            nodes {
              id
              title
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
        repository {
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
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
            licenseId
            ...taxonomyTermsV2
            revisions(unrevised: true) {
              totalCount
              nodes {
                id
                title
                trashed
              }
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
        ...anyRevision
        repository {
          licenseId
          ...taxonomyTermsV2
          trashed
          instance
          id
          alias
          currentRevision {
            ...anyRevision
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
      ... on ExerciseRevision {
        content
        repository {
          ...taxonomyTermsV2
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
            ...anyRevision
          }
          licenseId
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
      ... on ExerciseGroupRevision {
        ...exerciseGroupRevision
        cohesive
        repository {
          licenseId
          ...taxonomyTermsV2
          trashed
          instance
          id
          alias
          currentRevision {
            ...exerciseGroupRevision
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
      ... on VideoRevision {
        ...videoRevision
        repository {
          ...taxonomyTermsV2
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
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

  ${sharedTaxonomyParents}
  ${sharedRevisionFragments}
`
