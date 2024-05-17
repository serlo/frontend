import { gql } from 'graphql-request'

import {
  sharedExerciseFragments,
  sharedRevisionFragments,
  sharedTaxonomyParents,
} from './query-fragments'

export const dataQuery = gql`
  query mainUuid($id: Int, $alias: AliasInput) {
    authorization
    uuid(id: $id, alias: $alias) {
      __typename
      id
      title
      trashed
      alias

      ... on AbstractRepository {
        instance
        licenseId
      }

      ... on AbstractTaxonomyTermChild {
        ...taxonomyTermsV2
      }

      ... on AbstractEntity {
        date
        currentRevision {
          ...abstractEntityRevision
        }
        revisions(unrevised: true) {
          totalCount
          nodes {
            id
            title
            trashed
          }
        }
      }

      ... on Page {
        currentRevision {
          ...abstractRevision
        }
      }

      ... on Exercise {
        ...exercise
      }

      ... on Course {
        ...taxonomyTermsV2
      }

      ... on TaxonomyTerm {
        alias
        title
        instance
        type
        name
        description
        weight
        taxonomyId
        trashed
        parent {
          id
        }
        ...pathToRoot
        children {
          nodes {
            trashed
            __typename
            ...taxonomyTermChild
            ... on Exercise {
              ...exercise
            }
            ... on ExerciseGroup {
              id
              alias
              instance
              currentRevision {
                content
                id
                date
              }
              licenseId
            }
            ... on TaxonomyTerm {
              type
              name
              alias
              id
              description
              children {
                nodes {
                  trashed
                  __typename
                  ... on TaxonomyTerm {
                    id
                    alias
                    type
                    name
                  }
                  ...taxonomyTermChild
                }
              }
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

  fragment taxonomyTermChild on AbstractEntity {
    alias
    title
    id
    date
    currentRevision {
      title
    }
    revisions(first: 1, unrevised: true) {
      totalCount
      nodes {
        title
        trashed
        id
      }
    }
  }

  ${sharedTaxonomyParents}
  ${sharedExerciseFragments}
  ${sharedRevisionFragments}
`
