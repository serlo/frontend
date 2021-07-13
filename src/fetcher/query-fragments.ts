import { gql } from 'graphql-request'

export const sharedRevisionFragments = gql`
  fragment articleRevision on ArticleRevision {
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
    title
    url
    content
  }

  fragment appletRevision on AppletRevision {
    title
    content
    url
    metaTitle
    metaDescription
  }

  fragment coursePageRevision on CoursePageRevision {
    content
    title
  }

  fragment exerciseGroupRevision on ExerciseGroupRevision {
    content
  }

  fragment eventRevision on EventRevision {
    content
  }
`

export const sharedEventFragments = gql`
  fragment eventData on AbstractNotificationEvent {
    date
    __typename
    actor {
      id
      username
      activeAuthor
      activeDonor
      activeReviewer
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
      }
    }
    ... on CreateEntityNotificationEvent {
      entity {
        id
      }
    }
    ... on CreateEntityLinkNotificationEvent {
      parent {
        id
      }
      child {
        id
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
      }
    }
    ... on CreateTaxonomyLinkNotificationEvent {
      child {
        ...withTitle
      }
      parent {
        id
        name
      }
    }
    ... on CreateThreadNotificationEvent {
      thread {
        id
      }
      object {
        ...withTitle
      }
    }
    ... on RejectRevisionNotificationEvent {
      repository {
        id
      }
      revision {
        id
      }
      reason
    }
    ... on RemoveEntityLinkNotificationEvent {
      parent {
        id
      }
      child {
        id
      }
    }
    ... on RemoveTaxonomyLinkNotificationEvent {
      child {
        ...withTitle
      }
      parent {
        id
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
      }
      previousParent {
        id
      }
    }
    ... on SetTaxonomyTermNotificationEvent {
      taxonomyTerm {
        id
      }
    }
    ... on SetThreadStateNotificationEvent {
      archived
      thread {
        id
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
