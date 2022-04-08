import { gql } from 'graphql-request'

import {
  sharedExerciseFragments,
  sharedLicenseFragments,
  sharedPathFragments,
  sharedRevisionFragments,
} from './query-fragments'

export const dataQuery = gql`
  query uuid($id: Int, $alias: AliasInput) {
    authorization
    uuid(id: $id, alias: $alias) {
      __typename
      id
      trashed
      alias

      ... on AbstractRepository {
        instance
        ...license
      }

      ... on AbstractTaxonomyTermChild {
        ...taxonomyTerms
      }

      ... on Page {
        currentRevision {
          ...pageRevision
        }
        navigation {
          data
          ...path
        }
      }

      ... on Article {
        date
        currentRevision {
          ...articleRevision
        }
        revisions(unrevised: true) {
          totalCount
          nodes {
            title
          }
        }
      }

      ... on User {
        username
      }

      ... on Video {
        currentRevision {
          ...videoRevision
        }
        revisions(unrevised: true) {
          totalCount
          nodes {
            title
          }
        }
      }

      ... on Applet {
        date
        currentRevision {
          ...appletRevision
        }
        revisions(unrevised: true) {
          totalCount
          nodes {
            title
          }
        }
      }

      ... on CoursePage {
        date
        currentRevision {
          ...coursePageRevision
        }
        revisions(unrevised: true) {
          totalCount
          nodes {
            title
          }
        }
        course {
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
          ...taxonomyTerms
          revisions(unrevised: true) {
            totalCount
          }
        }
      }

      ... on Exercise {
        ...exercise
        revisions(unrevised: true) {
          totalCount
        }
      }

      ... on GroupedExercise {
        ...exercise
        exerciseGroup {
          alias
        }
        revisions(unrevised: true) {
          totalCount
        }
      }

      ... on ExerciseGroup {
        date
        currentRevision {
          ...exerciseGroupRevision
        }
        revisions(unrevised: true) {
          totalCount
        }
        exercises {
          ...exercise
          revisions(unrevised: true) {
            totalCount
          }
        }
      }

      ... on Solution {
        ...solution
        exercise {
          ... on Exercise {
            id
          }
          ... on GroupedExercise {
            id
          }
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
        navigation {
          data
          ...path
        }
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
              }
              exercises {
                ...exercise
              }
              ...license
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

  fragment taxonomyTerms on AbstractTaxonomyTermChild {
    taxonomyTerms {
      nodes {
        navigation {
          ...path
        }
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

  ${sharedPathFragments}
  ${sharedLicenseFragments}
  ${sharedExerciseFragments}
  ${sharedRevisionFragments}
`
