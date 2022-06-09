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
        ...withTitle
      }
      reason
    }
    ... on CreateCommentNotificationEvent {
      comment {
        id
      }
      thread {
        id
        title
        comments(first: 1) {
          nodes {
            id
          }
        }
      }
    }
    ... on CreateEntityNotificationEvent {
      entity {
        __typename
        id
        alias
        ...withTaxonomyTerms
        ...withTitle
      }
    }
    ... on CreateEntityLinkNotificationEvent {
      parent {
        __typename
        id
        alias
        ...withTaxonomyTerms
        ...withTitle
      }
      child {
        __typename
        id
        alias
        ...withTaxonomyTerms
        ...withTitle
      }
    }
    ... on CreateEntityRevisionNotificationEvent {
      entityRevision {
        id
      }
      entity {
        ...withTaxonomyTerms
        ...withTitle
      }
    }
    ... on CreateTaxonomyTermNotificationEvent {
      taxonomyTerm {
        id
        name
        alias
      }
    }
    ... on CreateTaxonomyLinkNotificationEvent {
      child {
        ...withTaxonomyTerms
        ...withTitle
      }
      parent {
        __typename
        id
        alias
        name
      }
    }
    ... on CreateThreadNotificationEvent {
      thread {
        id
        comments(first: 1) {
          nodes {
            id
            content
          }
        }
      }
      object {
        ...withTitle
      }
    }
    ... on RejectRevisionNotificationEvent {
      repository {
        id
        alias
        ...withTaxonomyTerms
        ...withTitle
      }
      revision {
        id
        alias
      }
      reason
    }
    ... on RemoveEntityLinkNotificationEvent {
      parent {
        id
        alias
        ...withTaxonomyTerms
        ...withTitle
      }
      child {
        id
        alias
        ...withTaxonomyTerms
        ...withTitle
      }
    }
    ... on RemoveTaxonomyLinkNotificationEvent {
      child {
        ...withTaxonomyTerms
        ...withTitle
      }
      parent {
        id
        alias
        name
      }
    }
    ... on SetLicenseNotificationEvent {
      repository {
        ...withTaxonomyTerms
        ...withTitle
      }
    }
    ... on SetTaxonomyParentNotificationEvent {
      child {
        id
        alias
      }
      previousParent {
        id
        alias
      }
    }
    ... on SetTaxonomyTermNotificationEvent {
      taxonomyTerm {
        id
        alias
        name
      }
    }
    ... on SetThreadStateNotificationEvent {
      archived
      thread {
        id
        comments(first: 1) {
          nodes {
            id
          }
        }
      }
    }
    ... on SetUuidStateNotificationEvent {
      object {
        ...withTitle
        ...withTaxonomyTerms
      }
      trashed
    }
  }

  fragment withTitle on AbstractUuid {
    __typename
    id
    alias

    ... on Applet {
      currentRevision {
        title
      }
    }
    ... on Article {
      currentRevision {
        title
      }
    }
    ... on Course {
      currentRevision {
        title
      }
    }
    ... on CoursePage {
      currentRevision {
        title
      }
    }
    ... on Video {
      currentRevision {
        title
      }
    }
    ... on Page {
      currentRevision {
        title
      }
    }
  }

  fragment withTaxonomyTerms on AbstractUuid {
    ... on Exercise {
      taxonomyTerms {
        nodes {
          name
          type
        }
      }
    }
    ... on ExerciseGroup {
      taxonomyTerms {
        nodes {
          name
          type
        }
      }
    }
    ... on GroupedExercise {
      exerciseGroup {
        taxonomyTerms {
          nodes {
            name
            type
          }
        }
      }
    }
    ... on Solution {
      exercise {
        ... on Exercise {
          __typename
          taxonomyTerms {
            nodes {
              name
              type
            }
          }
        }
        ... on GroupedExercise {
          __typename
          exerciseGroup {
            taxonomyTerms {
              nodes {
                name
                type
              }
            }
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
      content
      date
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
    trashed
    ...license
  }
`

export const sharedLicenseFragments = gql`
  fragment license on AbstractRepository {
    license {
      id
      url
      title
      shortTitle
      default
      agreement
    }
  }
`

export const sharedPathFragments = gql`
  fragment path on Navigation {
    path {
      nodes {
        label
        url
        id
      }
    }
  }
`
