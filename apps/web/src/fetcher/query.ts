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
        revisions(unrevised: false) {
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
          ...pageRevision
        }
      }

      ... on Article {
        date
        currentRevision {
          ...articleRevision
        }
      }

      ... on User {
        username
      }

      ... on Video {
        currentRevision {
          ...videoRevision
        }
      }

      ... on Applet {
        date
        currentRevision {
          ...appletRevision
        }
      }

      ... on CoursePage {
        date
        currentRevision {
          ...coursePageRevision
        }
        course {
          id
          licenseId
          currentRevision {
            title
          }
          revisions(unrevised: true) {
            totalCount
            nodes {
              id
              trashed
              title
            }
          }
          pages(trashed: false, hasCurrentRevision: true) {
            alias
            id
            currentRevision {
              title
              trashed
            }
          }
          ...taxonomyTermsV2
        }
      }

      ... on Exercise {
        subject {
          taxonomyTerm {
            name
          }
        }
        ...exercise
      }

      ... on ExerciseGroup {
        subject {
          taxonomyTerm {
            name
          }
        }
        date
        currentRevision {
          ...exerciseGroupRevision
        }
      }

      ... on Event {
        currentRevision {
          ...eventRevision
        }
      }

      ... on Course {
        pages(trashed: false) {
          alias
          id
          currentRevision {
            id
            title
            content
          }
        }
        currentRevision {
          title
          content
          metaDescription
        }
        ...taxonomyTermsV2
      }

      ... on TaxonomyTerm {
        alias
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
                cohesive
              }
              revisions(unrevised: true) {
                totalCount
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

  fragment taxonomyTermChild on AbstractRepository {
    ... on Article {
      alias
      id
      currentRevision {
        title
      }
      revisions(first: 1, unrevised: true) {
        nodes {
          title
        }
      }
    }

    ... on Video {
      alias
      id
      date
      currentRevision {
        title
        date
      }
      revisions(first: 1, unrevised: true) {
        nodes {
          title
        }
      }
    }

    ... on Applet {
      alias
      id
      currentRevision {
        title
      }
      revisions(first: 1, unrevised: true) {
        nodes {
          title
        }
      }
    }

    ... on Course {
      alias
      id
      currentRevision {
        title
      }
      revisions(first: 1, unrevised: true) {
        nodes {
          title
        }
      }
      pages {
        id
        currentRevision {
          id
        }
      }
    }

    ... on Event {
      alias
      id
      currentRevision {
        title
      }
      revisions(first: 1, unrevised: true) {
        nodes {
          title
        }
      }
    }
  }

  ${sharedTaxonomyParents}
  ${sharedExerciseFragments}
  ${sharedRevisionFragments}
`
