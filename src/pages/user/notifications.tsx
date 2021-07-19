import clsx from 'clsx'
import { gql } from 'graphql-request'
import { useState } from 'react'

import { useGraphqlSwrPaginationWithAuth } from '@/api/use-graphql-swr'
import { PageTitle } from '@/components/content/page-title'
import { FrontendClientBase } from '@/components/frontend-client-base'
import { Guard } from '@/components/guard'
import {
  NotificationData,
  Notifications,
} from '@/components/pages/user/notifications'
import { UnreadNotificationsCount } from '@/components/user-tools/unread-notifications-count'
import { useInstanceData } from '@/contexts/instance-context'
import { useLoggedInData } from '@/contexts/logged-in-data-context'
import { sharedEventFragments } from '@/fetcher/query-fragments'
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
  const { data, error, loadMore, loading } = useNotificationFetch({
    unread: showUnread,
  })

  const loggedInData = useLoggedInData()
  if (!loggedInData) return null
  const loggedInStrings = loggedInData.strings.notifications

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
      <Guard data={data} error={error} needsAuth>
        <Notifications data={data!} isLoading={loading} loadMore={loadMore} />
      </Guard>
    </>
  )
}

function Title() {
  const { strings } = useInstanceData()
  return <PageTitle title={strings.pageTitles.notifications} headTitle />
}

function useNotificationFetch({
  unread,
  noKey,
}: {
  unread?: boolean
  noKey?: boolean
}) {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  return useGraphqlSwrPaginationWithAuth<NotificationData>({
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

const notificationsQuery = gql`
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
          ...eventData
        }
      }
    }
  }

  ${sharedEventFragments}
`
