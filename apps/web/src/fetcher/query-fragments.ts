import { gql } from 'graphql-request'

export const sharedRevisionFragments = gql`
  fragment anyRevision on AbstractRevision {
    id
    title
    content
    date
  }

  fragment articleRevision on ArticleRevision {
    metaTitle
    metaDescription
  }

  fragment videoRevision on VideoRevision {
    url
  }

  fragment appletRevision on AppletRevision {
    url
    metaTitle
    metaDescription
  }

  fragment coursePageRevision on CoursePageRevision {
    alias
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
        ... on AbstractEntityRevision {
          changes
        }
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
        ...withTaxonomyTerms
        ...entityInfo
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
  }
`

export const sharedExerciseFragments = gql`
  fragment exercise on Exercise {
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
    licenseId
  }
`

export const sharedTaxonomyParents = gql`
  fragment pathToRoot on TaxonomyTerm {
    title
    alias
    id
    path {
      title
      alias
      id
    }
  }
`
