import { gql } from 'graphql-request'

import { sharedRevisionFragments } from './query-fragments'

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
          currentRevision {
            title
          }
        }
        currentRevision {
          title
        }
      }

      ... on TaxonomyTerm {
        alias
        instance
        type
        name
        description
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

  fragment license on AbstractRepository {
    license {
      id
      url
      title
      default
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
      currentRevision {
        title
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

  fragment exercise on AbstractExercise {
    id
    alias
    instance
    trashed
    currentRevision {
      content
    }
    solution {
      ...solution
    }
    ...license
  }

  fragment solution on Solution {
    id
    currentRevision {
      content
    }
    ...license
  }

  ${sharedRevisionFragments}
`
