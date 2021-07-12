import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import { Notifications } from '@/components/pages/user/notifications'
import { UnreadNotificationsCount } from '@/components/user-tools/unread-notifications-count'
import { NotificationEvent } from '@/components/user/notification'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { renderedPageNoHooks } from '@/helper/rendered-page'

export default renderedPageNoHooks(() => (
  <FrontendClientBase>
    <Title />
    <Content />
  </FrontendClientBase>
))

function Content() {
  const [showUnread, setShowUnread] = useState(true)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { data, error, loadMore, loading } = useNotificationFetch(true)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    data: readData,
    error: readError,
    loadMore: loadMoreRead,
    loading: loadingRead,
  } = useNotificationFetch(false, showUnread) //don't fetch if showUnread is true

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.notifications

  function onMoreRead() {
    loadMoreRead()
  }

  function onTabClick() {
    setShowUnread(!showUnread)
  }

  return (
    <>
      <p className="serlo-p">
        {/* //blur-hack, use https://caniuse.com/#feat=css-focus-visible when supported*/}
        <button
          className={clsx(
            'serlo-button mr-5 mb-5',
            showUnread
              ? 'serlo-make-interactive-primary'
              : 'serlo-make-interactive-light'
          )}
          onPointerUp={(e) => e.currentTarget.blur()}
          onClick={onTabClick}
        >
          {loggedInStrings.showNew} (<UnreadNotificationsCount onlyNumber />)
        </button>
        <button
          className={clsx(
            'serlo-button mr-5 mb-5',
            !showUnread
              ? 'serlo-make-interactive-primary'
              : 'serlo-make-interactive-light'
          )}
          onPointerUp={(e) => e.currentTarget.blur()}
          onClick={onTabClick}
        >
          {loggedInStrings.showRead}
        </button>
      </p>
      {showUnread ? (
        <Guard data={data} error={error} needsAuth>
          <Notifications
            data={data!}
            isLoading={loading}
            loadMore={loadMore}
            // isUnread
          />
        </Guard>
      ) : (
        <Guard data={readData} error={readError} needsAuth>
          <Notifications
            data={readData!}
            isLoading={loadingRead}
            loadMore={onMoreRead}
          />
        </Guard>
      )}
    </>
  )
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.notifications} headTitle />
}

export function useNotificationFetch(unread?: boolean, noKey?: boolean) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useGraphqlSwrPaginationWithAuth<{
    id: number
    event: NotificationEvent
    unread: boolean
  }>({
    query: notificationsQuery,
    variables: { first: 10, unread },
    config: {
      refreshInterval: 10 * 1000, // seconds
    },
    getConnection(data) {
      return data.notifications
    },
    noKey,
  })
}

export const notificationsVariables = {
  first: 10,
  unread: undefined,
}

export const notificationsQuery = gql`
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
