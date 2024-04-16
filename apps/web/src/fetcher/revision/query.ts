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
        ...anyRevision
        changes
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
        }
      }
      ... on ArticleRevision {
        ...articleRevision
        repository {
          currentRevision {
            ...articleRevision
          }
        }
      }
      ... on AppletRevision {
        ...appletRevision
        repository {
          currentRevision {
            ...appletRevision
          }
        }
      }
      ... on CourseRevision {
        repository {
          pages(trashed: false, hasCurrentRevision: true) {
            id
            alias
            currentRevision {
              ...anyRevision
            }
          }
        }
      }
      ... on CoursePageRevision {
        ...coursePageRevision
        repository {
          currentRevision {
            ...coursePageRevision
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
      ... on VideoRevision {
        ...videoRevision
        repository {
          currentRevision {
            ...videoRevision
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
