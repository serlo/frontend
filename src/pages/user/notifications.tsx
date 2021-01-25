import { gql } from 'graphql-request'
import React from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Notifications } from '@/components/pages/user/notifications'
import { NotificationEvent } from '@/components/user/notification'
import { useInstanceData } from '@/contexts/instance-context'

export default function Page() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useFetch()

  function loadMoreAction() {
    loadMore()
  }

  return (
    <FrontendClientBase>
      <Title />
      <Guard data={data} error={error} needsAuth>
        <Notifications
          data={data!}
          isLoading={loading}
          loadMore={loadMoreAction}
        />
      </Guard>
    </FrontendClientBase>
  )
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.notifications} headTitle />
}

function useFetch() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useGraphqlSwrPaginationWithAuth<{
    id: number
    event: NotificationEvent
    unread: boolean
  }>({
    query,
    variables: {
      first: 10,
      unread: undefined,
    },
    getConnection(data) {
      return data.notifications
    },
  })
}

const query = gql`
  query notifications($first: Int!, $unread: Boolean, $after: String) {
    notifications(first: $first, unread: $unread, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
        id
        unread
        event {
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
      }
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
