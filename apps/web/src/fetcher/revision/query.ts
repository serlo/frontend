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
        ...abstractEntityRevision
        changes
        repository {
          ...taxonomyTermsV2
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
            ...abstractEntityRevision
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

      ... on CoursePageRevision {
        repository {
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
          }
        }
      }
      ... on PageRevision {
        ...abstractRevision
        repository {
          licenseId
          trashed
          instance
          id
          alias
          currentRevision {
            ...abstractRevision
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
