import { gql } from 'graphql-request'

export const sharedRevisionFragments = gql`
  fragment articleRevision on ArticleRevision {
    id
    title
    content
    metaTitle
    metaDescription
    date
  }

  fragment pageRevision on PageRevision {
    id
    title
    content
  }

  fragment videoRevision on VideoRevision {
    id
    title
    url
    content
  }

  fragment appletRevision on AppletRevision {
    id
    title
    content
    url
    metaTitle
    metaDescription
    date
  }

  fragment coursePageRevision on CoursePageRevision {
    id
    alias
    content
    title
    date
  }

  fragment exerciseGroupRevision on ExerciseGroupRevision {
    id
    content
    cohesive
    date
  }

  fragment eventRevision on EventRevision {
    id
    title
    content
  }
`

export const sharedEventFragments = gql`
  fragment eventData on AbstractNotificationEvent {
    date
    id
    __typename
    actor {
      id
      username
      isActiveAuthor
      isActiveDonor
      isActiveReviewer
    }
    objectId
    ... on CheckoutRevisionNotificationEvent {
      revision {
        id
      }
      repository {
        ...withTaxonomyTerms
        ...entityInfo
      }
      reason
    }
    ... on CreateCommentNotificationEvent {
      comment {
        id
        content
      }
      thread {
        id
        title
        thread: comments(first: 1) {
          nodes {
            id
          }
        }
      }
    }
    ... on CreateEntityNotificationEvent {
      entity {
        ...withTaxonomyTerms
        ...entityInfo
      }
    }
    ... on CreateEntityLinkNotificationEvent {
      parent {
        ...withTaxonomyTerms
        ...entityInfo
      }
      child {
        ...withTaxonomyTerms
        ...entityInfo
      }
    }
    ... on CreateEntityRevisionNotificationEvent {
      entityRevision {
        id
      }
      entity {
        ...withTaxonomyTerms
        ...entityInfo
      }
    }
    ... on CreateTaxonomyTermNotificationEvent {
      taxonomyTerm {
        ...entityInfo
      }
    }
    ... on CreateTaxonomyLinkNotificationEvent {
      child {
        ...withTaxonomyTerms
        ...entityInfo
      }
      parent {
        ...entityInfo
      }
    }
    ... on CreateThreadNotificationEvent {
      thread {
        id
        thread: comments(first: 1) {
          nodes {
            id
            content
          }
        }
      }
      object {
        ...entityInfo
      }
    }
    ... on RejectRevisionNotificationEvent {
      repository {
        ...withTaxonomyTerms
        ...entityInfo
      }
      revision {
        id
        alias
      }
      reason
    }
    ... on RemoveEntityLinkNotificationEvent {
      parent {
        ...withTaxonomyTerms
        ...entityInfo
      }
      child {
        ...withTaxonomyTerms
        ...entityInfo
      }
    }
    ... on RemoveTaxonomyLinkNotificationEvent {
      child {
        ...withTaxonomyTerms
        ...entityInfo
      }
      parent {
        ...entityInfo
      }
    }
    ... on SetLicenseNotificationEvent {
      repository {
        ...withTaxonomyTerms
        ...entityInfo
      }
    }
    ... on SetTaxonomyParentNotificationEvent {
      child {
        ...entityInfo
      }
      previousParent {
        ...entityInfo
      }
      optionalParent: parent {
        ...entityInfo
      }
    }
    ... on SetTaxonomyTermNotificationEvent {
      taxonomyTerm {
        ...entityInfo
      }
    }
    ... on SetThreadStateNotificationEvent {
      archived
      thread {
        id
        thread: comments(first: 1) {
          nodes {
            id
          }
        }
      }
    }
    ... on SetUuidStateNotificationEvent {
      object {
        ...entityInfo
        ...withTaxonomyTerms
      }
      trashed
    }
  }

  fragment entityInfo on AbstractUuid {
    __typename
    id
    title
    alias
  }

  fragment withTaxonomyTerms on AbstractUuid {
    ... on Exercise {
      taxonomyTerms {
        nodes {
          type
        }
      }
    }
    ... on ExerciseGroup {
      taxonomyTerms {
        nodes {
          type
        }
      }
    }
    ... on GroupedExercise {
      exerciseGroup {
        taxonomyTerms {
          nodes {
            type
          }
        }
      }
    }
  }
`

export const sharedExerciseFragments = gql`
  fragment exercise on AbstractExercise {
    id
    alias
    instance
    trashed
    date
    currentRevision {
      id
      content
      date
    }
    ...license
  }
`

export const sharedLicenseFragments = gql`
  fragment license on AbstractRepository {
    license {
      id
    }
  }
`

// only 10 levels
export const sharedTaxonomyParents = gql`
  fragment pathToRoot on TaxonomyTerm {
    title
    alias
    id
    parent {
      title
      alias
      id
      parent {
        title
        alias
        id
        parent {
          title
          alias
          id
          parent {
            title
            alias
            id
            parent {
              title
              alias
              id
              parent {
                title
                alias
                id
                parent {
                  title
                  alias
                  id
                  parent {
                    title
                    alias
                    id
                    parent {
                      title
                      alias
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
