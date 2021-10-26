import { gql } from 'graphql-request'

export const sharedRevisionFragments = gql`
  fragment articleRevision on ArticleRevision {
    id
    title
    content
    metaTitle
    metaDescription
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
  }

  fragment coursePageRevision on CoursePageRevision {
    id
    content
    title
  }

  fragment exerciseGroupRevision on ExerciseGroupRevision {
    id
    content
    cohesive
  }

  fragment eventRevision on EventRevision {
    id
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
        comments(first: 1) {
          nodes {
            id
          }
        }
      }
    }
    ... on CreateEntityNotificationEvent {
      entity {
        id
        alias
      }
    }
    ... on CreateEntityLinkNotificationEvent {
      parent {
        id
        alias
      }
      child {
        id
        alias
      }
    }
    ... on CreateEntityRevisionNotificationEvent {
      entityRevision {
        id
      }
      entity {
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
        ...withTitle
      }
      parent {
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
      }
      child {
        id
        alias
      }
    }
    ... on RemoveTaxonomyLinkNotificationEvent {
      child {
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
`
